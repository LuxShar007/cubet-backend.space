import axios from 'axios';

// This function handles the redirect back from Spotify.
export default async function handler(req, res) {
    const code = req.query.code || null;
    const YOUR_HOSTINGER_DOMAIN = 'https://cubet.space';
    const SPOTIFY_REDIRECT_URI = `https://your-vercel-project-name.vercel.app/api/callback/spotify`;

    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
            }),
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
                ).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;
        
        // Redirect back to the front-end with the token in the URL hash
        res.redirect(307, `${YOUR_HOSTINGER_DOMAIN}/recommendations.html#access_token=${accessToken}`);

    } catch (error) {
        console.error('Spotify Callback Error:', error.response ? error.response.data : 'Unknown error');
        res.status(500).send('Error during Spotify authentication.');
    }
}