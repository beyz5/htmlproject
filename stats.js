const accessToken = localStorage.getItem('spotify_access_token');

if (!accessToken) {
    window.location.href = 'mainpage.html';
} else {
    fetchSpotifyStats(accessToken);
}

function fetchSpotifyStats(token) {
    // 1. GERÇEK SPOTIFY ARTISTS LİNKİ (Son 4 Hafta, Top 5)
    fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
        const artistsList = document.getElementById('top-artists-list');
        artistsList.innerHTML = '';
        
        if(data.items && data.items.length > 0){
            data.items.forEach((artist, index) => {
                const img = artist.images[0]?.url || 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
                artistsList.innerHTML += `
                    <li class="stats-item">
                        <span class="rank-number">#${index + 1}</span>
                        <img src="${img}" class="stats-img">
                        <div class="stats-info">
                            <span class="stats-name">${artist.name}</span>
                        </div>
                    </li>`;
            });
        } else {
            artistsList.innerHTML = '<p style="text-align:center;">There is no data available for the last 4 weeks.</p>';
        }
    })
    .catch(err => console.error("Artist error:", err));

    // 2. GERÇEK SPOTIFY TRACKS LİNKİ (Son 4 Hafta, Top 5)
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
        const tracksList = document.getElementById('top-tracks-list');
        tracksList.innerHTML = '';
        
        if(data.items && data.items.length > 0){
            data.items.forEach((track, index) => {
                const img = track.album.images[0]?.url || 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
                tracksList.innerHTML += `
                    <li class="stats-item">
                        <span class="rank-number">#${index + 1}</span>
                        <img src="${img}" class="stats-img">
                        <div class="stats-info">
                            <span class="stats-name">${track.name}</span>
                            <span class="stats-sub">${track.artists[0].name}</span>
                        </div>
                    </li>`;
            });
        } else {
            tracksList.innerHTML = '<p style="text-align:center;">There is no data available for the last 4 weeks.</p>';
        }
    })
    .catch(err => console.error("Track error:", err));
}