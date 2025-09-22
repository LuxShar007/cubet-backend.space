import axios from 'axios';

// This function handles the redirect back from Google.
export default async function handler(req, res) {
    const code = req.query.code || null;
    const YOUR_HOSTINGER_DOMAIN = 'https://cubet.space';
    // ?? Replace with your Vercel project name
    const GOOGLE_REDIRECT_URI = `https://your-vercel-project-name.vercel.app/api/callback/youtube`;

    try {
        const response = await axios({
            method: 'post',
            url: 'https://oauth2.googleapis.com/token',
            data: new URLSearchParams({
                code: code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        });

        const accessToken = response.data.access_token;
        
        // Redirect back to the front-end with the token in the URL hash
        // We add a 'source=youtube' parameter to help the front-end know which API to call
        res.redirect(307, `${YOUR_HOSTINGER_DOMAIN}/recommendations.html#access_token=${accessToken}&source=youtube`);

    } catch (error) {
        console.error('YouTube Callback Error:', error.response ? error.response.data : 'Unknown error');
        res.status(500).send('Error during YouTube authentication.');
    }
}