// This function handles the initial login redirect to Google.
export default function handler(req, res) {
    const scope = 'https://www.googleapis.com/auth/youtube.readonly';
    // ?? Replace with your Vercel project name
    const GOOGLE_REDIRECT_URI = `https://your-vercel-project-name.vercel.app/api/callback/youtube`;

    const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
        scope: scope,
        access_type: 'offline',
        include_granted_scopes: 'true',
        response_type: 'code',
        redirect_uri: GOOGLE_REDIRECT_URI,
        client_id: process.env.GOOGLE_CLIENT_ID, // From Vercel Environment Variables
    }).toString();

    res.redirect(307, authUrl);
}