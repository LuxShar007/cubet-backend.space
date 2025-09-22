// This function handles the initial login redirect to Spotify.
export default function handler(req, res) {
    const scope = 'user-read-private user-read-email';
    const SPOTIFY_REDIRECT_URI = `https://your-vercel-project-name.vercel.app/api/callback/spotify`;

    const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: SPOTIFY_REDIRECT_URI,
    }).toString();

    res.redirect(307, authUrl);
}