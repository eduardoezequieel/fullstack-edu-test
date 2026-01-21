/**
 * Server-side authentication utilities for middleware
 * Use these in proxy.ts for route protection
 */

/**
 * Validate token with backend by calling /auth/me endpoint
 */
export async function validateTokenWithBackend(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    return response.ok;
  } catch (error) {
    console.error('Error validating token with backend:', error);
    return false;
  }
}
