/**
 * Starfy - Musical Personality Logic (Final Version)
 */

const token = localStorage.getItem('spotify_access_token');

// Eğer token yoksa ana sayfaya (login) yönlendir
if (!token) {
    window.location.href = 'mainpage.html';
}

async function analyzePersonality() {
    try {
        // 1. ADIM: Spotify API'den en çok dinlenen sanatçıları çekiyoruz
        // limit=20 ve time_range=medium_term (son 6 ay) en dengeli sonuçları verir
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=20&time_range=medium_term', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        // Yetki hatası (Token süresi dolmuşsa)
        if (response.status === 401) {
            localStorage.removeItem('spotify_access_token');
            window.location.href = 'mainpage.html';
            return;
        }

        // 403 Forbidden Hatası: Genelde Dashboard'da mail ekli olmadığında çıkar
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Spotify API Hatası:", errorData.error.message);
            throw new Error(`Hata Kodu: ${response.status}`);
        }

        const data = await response.json();
        console.log("Spotify'dan Gelen Veri:", data);

        let genreCounts = {};

        // 2. ADIM: Türleri (Genres) hesaplıyoruz
        if (data.items && data.items.length > 0) {
            data.items.forEach(artist => {
                // Genres dizisi var mı ve içi dolu mu kontrol et (TypeError engelleyici)
                if (artist.genres && Array.isArray(artist.genres)) {
                    artist.genres.forEach(g => {
                        genreCounts[g] = (genreCounts[g] || 0) + 1;
                    });
                }
            });
        }

        // 3. ADIM: En çok tekrar eden türü buluyoruz
        // Eğer hiçbir tür bulunamazsa "Bilinmiyor" yerine varsayılan bir tür atıyoruz
        let topGenre = Object.keys(genreCounts).length > 0 
            ? Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b)
            : "indie"; 

        // 4. ADIM: Sonuçları ekrana yansıtıyoruz
        displayResult(topGenre);

    } catch (error) {
        console.error("Analiz sürecinde hata:", error);
        // Hata durumunda bile arayüzün donmaması için varsayılan bir sonuç döndürelim
        displayResult("Bilinmiyor");
    }
}

/**
 * Müzik türüne göre kişilik başlığı ve açıklaması üretir
 */
function getPersonalityMatch(genre) {
    if (!genre || genre === "Bilinmiyor") {
        return { 
            title: "Bağımsız Ruh", 
            desc: "Müzik zevkin tek bir kalıba sığmıyor! Standart janrların ötesinde bir kulağın var." 
        };
    }
    
    const g = genre.toLowerCase();
    
    // Geniş kapsamlı janr eşleşmeleri
    if (g.includes("pop")) return { title: "Pop İkonu", desc: "Enerjinle etrafına neşe saçıyorsun ve trendleri daima sen belirliyorsun." };
    if (g.includes("rock")) return { title: "Bağımsız Hayalperest", desc: "Ana akımdan uzak, kendi dünyanda derin anlamlar arayan birisin." };
    if (g.includes("rap") ||g.includes("hip hop")) return { title: "Sokak Şairi", desc: "Kelimelerin gücüne inanıyorsun ve hayatın ritmini sokaklardan alıyorsun." };
    if (g.includes("metal") || g.includes("punk")) return { title: "Karanlık Lord", desc: "Güçlü riffler ve saf enerji senin doğanda var. Yoğun duyguları seviyorsun." };
    if (g.includes("hyperpop") || g.includes("techno") || g.includes("house") || g.includes("electronic")) return { title: "Gece Kuşu", desc: "BPM senin nabzın! Durmadan hareket etmek senin hayat tarzın." };
    if (g.includes("jazz") || g.includes("classical") || g.includes("blues") || g.includes("piano")) return { title: "Sofistike Ruh", desc: "Eski bir ruhsun. Derinlik, huzur ve kalite senin için her şey." };
    if (g.includes("k-pop") || g.includes("j-pop")) return { title: "Işıltılı İdol", desc: "Renkli, enerjik ve kusursuz bir ritmin var. Koreografin her an hazır!" };
    if (g.includes("indie") || g.includes("dream pop")) return { title: "Rüya Kaşifi", desc: "Hayal gücün sınırsız. Farklı ve özgün müziklerle ruhunu besliyorsun." };
    if (g.includes("alternative") || g.includes("emo")) return { title: "Duygusal Kaşif", desc: "Duyguların derin ve karmaşık. Müziğinle dünyayı anlamaya çalışıyorsun." };
    // Eğer janr yukarıdakilere girmiyorsa varsayılan sonuç
    return { 
        title: "Orijinal Tarz", 
        desc: `Müzik zevkin tam olarak "${genre}"! Kimseye benzemeyen, tamamen şahsına münhasır bir tarzın var.` 
    };
}

function displayResult(topGenre) {
    const loading = document.getElementById('loading-screen');
    const result = document.getElementById('result-screen');
    
    const g = topGenre.toLowerCase();
    let bgClass = "bg-default"; // Varsayılan

    // Tür eşleştirmesine göre arka plan sınıfını seç
    if (g.includes("pop")) bgClass = "bg-pop";
    else if (g.includes("rock")) bgClass = "bg-rock";
    else if (g.includes("metal") || g.includes("punk")) bgClass = "bg-metal";
    else if (g.includes("indie") || g.includes("dream pop")) bgClass = "bg-indie";
    else if (g.includes("hyperpop") || g.includes("techno") || g.includes("house") || g.includes("electronic")) bgClass = "bg-hyperpop";
    else if (g.includes("rap") || g.includes("hip hop")) bgClass = "bg-rap";
    else if (g.includes("jazz") || g.includes("classical") || g.includes("blues") || g.includes("piano")) bgClass = "bg-jazz";
    else if (g.includes("k-pop") || g.includes("j-pop")) bgClass = "bg-kpop";
    else if (g.includes("alternative") || g.includes("emo")) bgClass = "bg-alternative";

    setTimeout(() => {
        if (loading) loading.style.display = 'none';
        
        // --- SİHİRLİ SATIR: Tüm sayfanın arka planını değiştirir ---
        document.body.className = bgClass; 
        
        if (result) result.style.display = 'block';

        // Yazı ve resim güncellemeleri zaten burada duruyor...
        document.getElementById('top-genre').innerHTML = `Müzik Türün: <b>${topGenre.toUpperCase()}</b>`;
        const personality = getPersonalityMatch(topGenre);
        document.getElementById('personality-title').innerText = personality.title;
        document.getElementById('personality-desc').innerText = personality.desc;
    }, 3000);
}

analyzePersonality();