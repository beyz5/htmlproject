const clientId = 'e4667ed0b869458ca49bdb6f5179fff1';
const redirectUri = 'http://127.0.0.1:5500/dashboard.html';

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');
let storedToken = localStorage.getItem('spotify_access_token');

if (code) {
    window.history.pushState("", document.title, window.location.pathname);
    let codeVerifier = localStorage.getItem('code_verifier');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier
    });

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;
        if(accessToken) {
             localStorage.setItem('spotify_access_token', accessToken);
             fetchUserData(accessToken); 
        }
    })
    .catch(error => console.error("Token error:", error));

} 

else if (storedToken) {
    fetchUserData(storedToken); 
} 

else {
    window.location.href = 'mainpage.html';
}

function fetchUserData(accessToken) {
    fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    })
    .then(response => response.json())
    .then(data => {
        const avatarImg = document.getElementById('user-avatar');
        if (data.images && data.images.length > 0) {
            avatarImg.src = data.images[0].url; 
        } else {
            avatarImg.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
        }
    })
    .catch(error => console.error("User data error:", error));
}

const btnStats = document.getElementById('btn-stats');
if(btnStats){
    btnStats.addEventListener('click', () => {
        window.location.href = 'stats.html'; 
    });
}

const btnTest = document.getElementById('btn-test');

if (btnTest) {
    btnTest.addEventListener('click', () => {
        window.location.href = 'testpage.html'; 
    });
}

const btnPersonality = document.getElementById('btn-personality');
if (btnPersonality) {
    btnPersonality.addEventListener('click', () => {
        window.location.href = 'personality.html'; 
    });
}