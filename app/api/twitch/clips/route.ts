import { NextResponse, NextRequest } from 'next/server';

/**
 * GET /api/twitch/clips
 *
 * Proxy request to Twitch Helix Clips endpoint.
 * Accepts the same query parameters defined by Twitch API documentation.
 * The handler obtains an app access token using the client‑credentials flow
 * (re‑using the same logic as the token endpoint) and forwards the request
 * with the required `Authorization: Bearer <token>` and `Client-Id` headers.
 */

async function getAppAccessToken(): Promise<string | null> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const tokenUrl = process.env.TWITCH_OAUTH_TOKEN_URL ?? 'https://id.twitch.tv/oauth2/token';

  if (!clientId || !clientSecret) return null;

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });

  const res = await fetch(`${tokenUrl}?${params.toString()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token;
}

export async function GET(request: NextRequest) {
  const token = await getAppAccessToken();
  if (!token) {
    return NextResponse.json({ error: 'Unable to obtain Twitch access token' }, { status: 500 });
  }

  // Preserve all query parameters and forward them to Twitch API
  const url = new URL('https://api.twitch.tv/helix/clips');
  url.search = request.nextUrl.search; // copy query string

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID ?? '',
    },
  });

  const data = await response.json();
  return new NextResponse(JSON.stringify(data), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
