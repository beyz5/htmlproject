const clientId = 'e4667ed0b869458ca49bdb6f5179fff1'; 
const redirectUri = 'http://127.0.0.1:5500/dashboard.html'; 
// İstatistikleri okuyabilmek için user-top-read izni eklendi:
const scopes = 'user-read-private user-read-email user-top-read'; 

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

document.addEventListener("DOMContentLoaded", () => {
    const spotifyButton = document.getElementById('spotify-button');
    
    if (spotifyButton) {
        spotifyButton.addEventListener('click', async () => {
            try {
                const codeVerifier  = generateRandomString(64);
                const hashed = await sha256(codeVerifier);
                const codeChallenge = base64encode(hashed);

                window.localStorage.setItem('code_verifier', codeVerifier);

                // DİKKAT: Gerçek Spotify Yetkilendirme Linki
                const authUrl = new URL("https://accounts.spotify.com/authorize");
                const params = {
                  response_type: 'code',
                  client_id: clientId,
                  scope: scopes,
                  code_challenge_method: 'S256',
                  code_challenge: codeChallenge,
                  redirect_uri: redirectUri,
                };

                authUrl.search = new URLSearchParams(params).toString();
                window.location.href = authUrl.toString();
            } catch (error) {
                console.error("Hata:", error);
            }
        });
    }
});