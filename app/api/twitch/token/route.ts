import { NextResponse } from 'next/server';

/**
 * GET /api/twitch/token
 *
 * Retrieves an app access token from Twitch using the client‑credentials flow.
 * The endpoint reads the required configuration from environment variables:
 *   - TWITCH_CLIENT_ID
 *   - TWITCH_CLIENT_SECRET
 *   - TWITCH_OAUTH_TOKEN_URL (defaults to https://id.twitch.tv/oauth2/token)
 *
 * It returns the JSON response from Twitch which includes the access_token,
 * expires_in, and token_type fields.
 */
export async function GET() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const tokenUrl = process.env.TWITCH_OAUTH_TOKEN_URL ?? 'https://id.twitch.tv/oauth2/token';

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET in environment.' },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });

  try {
    const response = await fetch(`${tokenUrl}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json(
        { error: 'Failed to obtain Twitch token', details: errorBody },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error', details: (err as any).message }, { status: 500 });
  }
}
