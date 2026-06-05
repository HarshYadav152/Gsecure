import { NextResponse } from 'next/server';
import connectingtoDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { generateAccessToken } from '@/lib/utils/jwt';

const STATE_COOKIE = 'github_oauth_state';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
const GITHUB_EMAILS_URL = 'https://api.github.com/user/emails';

function loginRedirect(errorCode) {
  const base = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000';
  const url = new URL('/login', base);
  if (errorCode) url.searchParams.set('error', errorCode);
  return NextResponse.redirect(url);
}

// GET /api/v1/auth/github/callback
// Validates the CSRF state, exchanges the code for a token, resolves the GitHub
// profile + verified email, links or creates the user, and issues the same
// session cookie the password login uses.
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
    const tokenRes = await fetch(GITHUB_TOKEN_URL, {
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
    const userRes = await fetch(GITHUB_USER_URL, { headers: ghHeaders });
    if (!userRes.ok) {
      return loginRedirect('github_profile_fetch_failed');
    }
    const ghUser = await userRes.json();
    const githubId = ghUser?.id != null ? String(ghUser.id) : null;
    const login = ghUser?.login;
    if (!githubId || !login) {
      return loginRedirect('github_profile_incomplete');
    }

    // 4. Resolve a verified primary email (server-side), with a deterministic
    //    GitHub no-reply fallback so the required email field is always set.
    let email = null;
    const emailsRes = await fetch(GITHUB_EMAILS_URL, { headers: ghHeaders });
    if (emailsRes.ok) {
      const emails = await emailsRes.json();
      if (Array.isArray(emails)) {
        const primaryVerified = emails.find((e) => e.primary && e.verified);
        const anyVerified = emails.find((e) => e.verified);
        email = (primaryVerified || anyVerified || emails[0])?.email || null;
      }
    }
    if (!email) {
      email = `${githubId}+${login}@users.noreply.github.com`;
    }
    email = email.toLowerCase();

    await connectingtoDB();

    // 5. Account linking (prevents duplicate accounts):
    //    a) returning GitHub user -> matched by githubId
    //    b) existing local user, same email -> link githubId onto it
    //    c) otherwise -> create a new GitHub-authenticated account
    let user = await User.findOne({ githubId });

    if (!user) {
      const byEmail = await User.findOne({ email });
      if (byEmail) {
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
    const response = NextResponse.redirect(new URL('/vault', base));

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
