import { NextResponse } from 'next/server';

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const STATE_COOKIE = 'github_oauth_state';

// GET /api/v1/auth/github
// Kicks off the GitHub OAuth flow: sets a short-lived CSRF "state" cookie and
// redirects the browser to GitHub's authorize screen.
export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const callbackUrl = process.env.GITHUB_OAUTH_CALLBACK_URL;
  const base = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000';

  if (!clientId || !callbackUrl) {
    // Misconfigured server -> send the user back to login instead of erroring.
    const url = new URL('/login', base);
    url.searchParams.set('error', 'github_oauth_not_configured');
    return NextResponse.redirect(url);
  }

  // Random, unguessable state echoed back by GitHub and verified in the callback.
  const state = crypto.randomUUID();

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', callbackUrl);
  authorizeUrl.searchParams.set('scope', 'read:user user:email');
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('allow_signup', 'true');

  const response = NextResponse.redirect(authorizeUrl);

  // sameSite 'lax' (NOT 'strict') so this CSRF cookie survives GitHub's
  // cross-site redirect back to the callback. The session cookie stays strict.
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
    path: '/',
  });

  return response;
}
