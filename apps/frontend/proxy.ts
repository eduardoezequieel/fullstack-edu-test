import { NextRequest, NextResponse } from 'next/server';
import { validateTokenWithBackend } from './features/auth/lib/auth.server';

/**
 * Proxy to protect authenticated routes with backend token validation
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;

  // Define protected route prefixes
  const protectedPrefixes = ['/dashboard'];

  // Check if the current route is protected
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  // If trying to access a protected route without a token, redirect to login
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing a protected route, validate the token with backend
  if (isProtectedRoute && accessToken) {
    const isValid = await validateTokenWithBackend(accessToken);

    if (!isValid) {
      // Token is invalid or expired, clear cookie and redirect to login
      const loginUrl = new URL('/', request.url);
      const response = NextResponse.redirect(loginUrl);

      // Clear auth cookie
      response.cookies.delete('access_token');

      return response;
    }
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (accessToken && pathname === '/') {
    const isValid = await validateTokenWithBackend(accessToken);

    if (isValid) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Create response
  const response = NextResponse.next();

  // Add custom headers for server-side route detection
  response.headers.set('x-pathname', pathname);
  response.headers.set('x-url', request.url);

  // Add security headers
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('x-xss-protection', '1; mode=block');
  response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');

  return response;
}

// Configure which routes the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)',
  ],
};
