import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define protected routes
const protectedRoutes = [
    "/vault"
  // Add more protected routes here
];

// Define protected API routes
const protectedApiRoutes = [
  '/api/v1/auth/me',
  '/api/v1/auth/logout',
  '/api/v1/vault/add-item',
  '/api/v1/vault/expose-vault',
  '/api/v1/vault/delete-vault-item',
  '/api/v1/vault/update-vault-item',
  // Add more protected API routes here
];

// Define public routes that should redirect to dashboard if authenticated
const authRoutes = [
  '/login',
  '/register'
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('authToken')?.value;
  console.log("token in middleware : ", token);

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isProtectedApiRoute = protectedApiRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Handle protected routes (pages)
  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify token using jose - MUST encode secret and MUST await
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      
      // Clear invalid token
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('authToken');
      return response;
    }
  }

  // Handle protected API routes
  if (isProtectedApiRoute) {
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      // Verify token using jose - MUST encode secret and MUST await
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      // Clone the request headers and add user info
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.userId || payload._id);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('API Token verification failed:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    try {
      // Verify token using jose - MUST encode secret and MUST await
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL('/vault', request.url));
    } catch (error) {
      // Token is invalid, allow access to auth routes
      const response = NextResponse.next();
      response.cookies.delete('authToken');
      return response;
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};