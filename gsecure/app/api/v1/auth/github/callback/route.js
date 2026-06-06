import { NextResponse } from 'next/server';
import connectingtoDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { generateAccessToken } from '@/lib/utils/jwt';

const STATE_COOKIE = 'github_oauth_state';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
const GITHUB_EMAILS_URL = 'https://api.github.com/user/emails';
const GITHUB_FETCH_TIMEOUT_MS = 8000;

/**
 * fetch() wrapper that aborts after timeoutMs so a stalled GitHub upstream
 * cannot hang the auth request indefinitely.
 * @param {string} url
 * @param {RequestInit} [options]
 * @param {number} [timeoutMs]
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = GITHUB_FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Build a redirect back to /login, optionally with an ?error code so the UI
 * can surface what went wrong without leaking details.
 * @param {string} [errorCode]
 * @returns {NextResponse}
 */
function loginRedirect(errorCode) {
  const base = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000';
  const url = new URL('/login', base);
  if (errorCode) url.searchParams.set('error', errorCode);
  return NextResponse.redirect(url);
}

/**
 * GET /api/v1/auth/github/callback
 *
 * OAuth callback: validates the CSRF state, exchanges the code for an access
 * token, resolves a GitHub-verified email (server-side), then links or creates
 * the account and issues the same authToken cookie the password login uses.
 * Only verified emails are ever trusted for linking, and an email already bound
 * to a different GitHub account is never silently re-linked.
 * @param {Request} req
 * @returns {Promise<NextResponse>}
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // 1. CSRF: state must be present and match the cookie set at initiation.
    const storedState = req.cookies.get(STATE_COOKIE)?.value;
    if (!code || !state || !storedState || state !== storedState) {
      return loginRedirect('github_state_mismatch');
    }

    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
    const callbackUrl = process.env.GITHUB_OAUTH_CALLBACK_URL;
    if (!clientId || !clientSecret || !callbackUrl) {
      return loginRedirect('github_oauth_not_configured');
    }

    // 2. Exchange the authorization code for an access token.
    const tokenRes = await fetchWithTimeout(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: callbackUrl,
      }),
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData?.access_token;
    if (!accessToken) {
      return loginRedirect('github_token_exchange_failed');
    }

    // 3. Fetch the GitHub profile.
    const ghHeaders = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'gsecure',
    };
    const userRes = await fetchWithTimeout(GITHUB_USER_URL, { headers: ghHeaders });
    if (!userRes.ok) {
      return loginRedirect('github_profile_fetch_failed');
    }
    const ghUser = await userRes.json();
    const githubId = ghUser?.id != null ? String(ghUser.id) : null;
    const login = ghUser?.login;
    if (!githubId || !login) {
      return loginRedirect('github_profile_incomplete');
    }

    // 4. Resolve a GitHub-VERIFIED email only. We never trust an unverified
    //    address for account creation/linking (it would be an account-takeover
    //    vector). If none is verified, use a deterministic no-reply fallback so
    //    the required, unique email field is always satisfied. A failed/stalled
    //    emails fetch also falls through to the no-reply fallback.
    let email = null;
    try {
      const emailsRes = await fetchWithTimeout(GITHUB_EMAILS_URL, { headers: ghHeaders });
      if (emailsRes.ok) {
        const emails = await emailsRes.json();
        if (Array.isArray(emails)) {
          const primaryVerified = emails.find((e) => e.primary && e.verified);
          const anyVerified = emails.find((e) => e.verified);
          email = (primaryVerified || anyVerified)?.email || null;
        }
      }
    } catch {
      // ignore - fall through to the no-reply fallback below
    }
    if (!email) {
      email = `${githubId}+${login}@users.noreply.github.com`;
    }
    email = email.toLowerCase();

    await connectingtoDB();

    // 5. Account resolution (prevents duplicates and unsafe linking):
    //    a) returning GitHub user -> matched by githubId
    //    b) existing account with the same VERIFIED email and no githubId (or
    //       the same githubId) -> link githubId onto it
    //    c) email already bound to a DIFFERENT githubId -> refuse (no hijack)
    //    d) otherwise -> create a new GitHub-authenticated account
    let user = await User.findOne({ githubId });

    if (!user) {
      const byEmail = await User.findOne({ email });
      if (byEmail) {
        if (byEmail.githubId && byEmail.githubId !== githubId) {
          return loginRedirect('github_account_conflict');
        }
        byEmail.githubId = githubId;
        await byEmail.save();
        user = byEmail;
      }
    }

    if (!user) {
      // Dedupe the chosen username against the unique index.
      let username = login.toLowerCase();
      let attempt = 0;
      while (await User.findOne({ username })) {
        attempt += 1;
        username =
          attempt === 1
            ? `${login.toLowerCase()}-${githubId.slice(-4)}`
            : `${login.toLowerCase()}-${Math.random().toString(36).slice(2, 8)}`;
      }
      user = await User.create({
        username,
        email,
        githubId,
        authProvider: 'github',
      });
    }

    // 6. Issue the same session token + cookie the password login uses.
    const { authToken } = await generateAccessToken(user._id);

    const base = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000';
    // Redirect to an interstitial page that confirms the auth cookie is
    // readable (via /api/v1/auth/me) before sending the user on to /vault.
    // Some browsers don't expose a freshly-Set-Cookie value to the very next
    // navigation, which previously required a manual refresh of /vault.
    const response = NextResponse.redirect(new URL('/auth/success', base));

    response.cookies.set('authToken', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    // Clear the one-time CSRF state cookie.
    response.cookies.set(STATE_COOKIE, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    return loginRedirect('github_oauth_failed');
  }
}
