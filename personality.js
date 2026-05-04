const token = localStorage.getItem('spotify_access_token');

if (!token) {
    window.location.href = 'mainpage.html';
}

async function analyzePersonality() {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (response.status === 401) {
            localStorage.removeItem('spotify_access_token');
            window.location.href = 'mainpage.html';
            return;
        }

        if (!response.ok) {
            throw new Error(`Spotify API Hatası: ${response.status}`);
        }

        const data = await response.json();
        console.log("Spotify'dan Gelen Ham Veri (Sanatçılar):", data.items);

        if (!data.items || data.items.length === 0) {
            console.log("Hata: Kullanıcının dinleme geçmişi bomboş!");
            displayResult("ghost"); 
            return; 
        }

        let genreCounts = {};

        data.items.forEach((artist, index) => {
        let weight = 50 - index; 

            // PLAN A
            if (artist.genres && artist.genres.length > 0) {
                artist.genres.forEach(g => {
                    const genreName = g.toLowerCase();
                    genreCounts[genreName] = (genreCounts[genreName] || 0) + weight;
                });
            } 
            // PLAN B
            else {
                const name = artist.name.toLowerCase();

                // 1. METAL
                if (name.includes("metallica") || name.includes("linkin park") || name.includes("deftones") || name.includes("rammstein") || name.includes("system of a down") || name.includes("hayko cepkin") || name.includes("slayer") || name.includes("korn") || name.includes("slipknot") || name.includes("pentagram") || name.includes("pantera") || name.includes("black sabbath") || name.includes("nightwish") || name.includes("soad") || name.includes("bring me the horizon") || name.includes("ghost") || name.includes("iron maiden") || name.includes("opeth") || name.includes("dream theater") || name.includes("gojira") || name.includes("motorhead") || name.includes("avenged sevenfold") || name.includes("disturbed") || name.includes("bad omens") || name.includes("megadeth") || name.includes("ozzy osbourne") || name.includes("papa roach") || name.includes("limp bizkit") || name.includes("five finger death punch") || name.includes("alice in chains") || name.includes("apocalyptica") || name.includes("aerosmith") || name.includes("scorpions") || name.includes("spiritworld") || name.includes("lamb of god")) {
                    genreCounts["metal"] = (genreCounts["metal"] || 0) + weight;
                }
                // 2. ROCK
                else if (name.includes("arctic monkeys") || name.includes("queen") || name.includes("imagine dragons") || name.includes("duman") || name.includes("teoman") || name.includes("şebnem ferah") || name.includes("redd") || name.includes("adamlar") || name.includes("the beatles") || name.includes("kiss") || name.includes("my chemical romance") || name.includes("the strokes") || name.includes("mavi gri") || name.includes("mor ve ötesi") || name.includes("pearl jam") || name.includes("blur") || name.includes("oasis") || name.includes("pilli bebek") || name.includes("yavuz çetin") || name.includes("red hot chili peppers") || name.includes("the rolling stones") || name.includes("ac/dc") || name.includes("coldplay") || name.includes("led zeppelin") || name.includes("bon jovi") || name.includes("nirvana") || name.includes("manga") || name.includes("kurban") || name.includes("yüzyüzeyken konuşuruz") || name.includes("erkin koray") || name.includes("cem karaca") || name.includes("the cure") || name.includes("green day") || name.includes("palaye royale") || name.includes("onerepublic")) {
                    genreCounts["rock"] = (genreCounts["rock"] || 0) + weight;
                }
                // 3. INDIE
                else if (name.includes("radiohead") || name.includes("the smiths") || name.includes("tame impala") || name.includes("lana del rey") || name.includes("cigarettes after sex") || name.includes("dolu kadehi ters tut") || name.includes("sombr") || name.includes("keshi") || name.includes("mitski") || name.includes("mac demarco") || name.includes("hozier") || name.includes("beach house") || name.includes("laufey") || name.includes("conan gray") || name.includes("malcolm todd") || name.includes("dolu kadehi ters tut") || name.includes("skapova") || name.includes("henry morris") || name.includes("rei 6") || name.includes("eyedress") || name.includes("lamp") || name.includes("madrigal") || name.includes("djo") || name.includes("girl in red") || name.includes("clario") || name.includes("vacations") || name.includes("luvcat") || name.includes("cavetown") || name.includes("beabadoobee") || name.includes("booygenius") || name.includes("kalben") || name.includes("deniz tekin") || name.includes("cigarettes after sex") || name.includes("stephen sanchez") || name.includes("strawberry guy")) {
                    genreCounts["indie"] = (genreCounts["indie"] || 0) + weight;
                }
                // 4. RAP
                else if (name.includes("eminem") || name.includes("drake") || name.includes("travis scott") || name.includes("kendrick lamar") || name.includes("ezhel") || name.includes("sagopa kajmer") || name.includes("kanye west") || name.includes("21 savage") || name.includes("post malone") || name.includes("nicki minaj") || name.includes("ceza") || name.includes("frank ocean") || name.includes("murda") || name.includes("motive") || name.includes("sansar salvo") || name.includes("lvbel c5") || name.includes("wegh") || name.includes("uzi") || name.includes("batuflex") || name.includes("era7capone") || name.includes("ati242") || name.includes("poizi") || name.includes("organize") || name.includes("xxxtentacion") || name.includes("playboy carti") || name.includes("central cee") || name.includes("nas") || name.includes("2pac") || name.includes("tyler the creator") || name.includes("50 cent")|| name.includes("flo milli") || name.includes("ndotz") || name.includes("cardi b") || name.includes("jack harlow") || name.includes("gunna") || name.includes("baby keem") || name.includes("sexyy red")) {
                    genreCounts["rap"] = (genreCounts["rap"] || 0) + weight;
                }
                // 5. POP
                else if (name.includes("taylor swift") || name.includes("the weeknd") || name.includes("billie eilish") || name.includes("dua lipa") || name.includes("harry styles") || name.includes("tarkan") || name.includes("hande yener") || name.includes("abba") || name.includes("olivia rodrigo") || name.includes("justin bieber") || name.includes("edis") || name.includes("bruno mars") || name.includes("mabel matiz") || name.includes("sezen aksu") || name.includes("semicenk") || name.includes("sertab erener") || name.includes("gökhan türkmen") || name.includes("manuş baba") || name.includes("yalın") || name.includes("oğuzhan koç") || name.includes("doja cat") || name.includes("lady gaga") || name.includes("ariana grande") || name.includes("kali uchis") || name.includes("bengü") || name.includes("murat boz") || name.includes("serdar ortaç") || name.includes("zeynep bastık") || name.includes("can bonomo") || name.includes("halsey") || name.includes("bad bunny") || name.includes("adele") || name.includes("one direction") || name.includes("kesha") || name.includes("troye sivan")) {
                    genreCounts["pop"] = (genreCounts["pop"] || 0) + weight;
                }
                // 6. K-POP
                else if (name.includes("bts") || name.includes("blackpink") || name.includes("stray kids") || name.includes("newjeans") || name.includes("twice") || name.includes("txt") || name.includes("enhypen") || name.includes("got7") || name.includes("exo") || name.includes("ateez") || name.includes("astro") || name.includes("nct") || name.includes("ive") || name.includes("itzy") || name.includes("le sserafim") || name.includes("dpr ian") || name.includes("jeff satur") || name.includes("oceanfromtheblue") || name.includes("aespa") || name.includes("roy kim") || name.includes("seventeen") || name.includes("g-idle") || name.includes("cortis") || name.includes("kai")  || name.includes("nmixx") || name.includes("baby monster") || name.includes("treasure") || name.includes("taemin") || name.includes("iu") || name.includes("bibi") || name.includes("b.i") || name.includes("ikon") || name.includes("monsta x") || name.includes("xdinary heroes") || name.includes("wave to earth") || name.includes("jonghyun") || name.includes("dean") || name.includes("day6") || name.includes("eric nam")) {
                    genreCounts["k-pop"] = (genreCounts["k-pop"] || 0) + weight;
                }
                // 7. HYPERPOP / ELECTRONIC
                else if (name.includes("charli xcx") || name.includes("sophie") || name.includes("100 gecs") || name.includes("daft punk") || name.includes("skrillex") || name.includes("ag cook") || name.includes("laura les") || name.includes("bladee") || name.includes("pinkpantheress") || name.includes("shygirl") || name.includes("arca") || name.includes("yung lean") || name.includes("drain gang") || name.includes("gary numan") || name.includes("odetari") || name.includes("odecore") || name.includes("asteria") || name.includes("maretu") || name.includes("sayfalse") || name.includes("mindless self indulgence") || name.includes("kkb") || name.includes("kero kero bonito") || name.includes("glaive") || name.includes("ericdoa") || name.includes("brakence") || name.includes("machine girl") || name.includes("caroline polachek") || name.includes("ecco2k") || name.includes("artemas") || name.includes("snow strippers") || name.includes("gregor mcmurray") || name.includes("sweetiele") || name.includes("ellisar") || name.includes("benny bellson") || name.includes("sylendanna")) {
                    genreCounts["hyperpop"] = (genreCounts["hyperpop"] || 0) + weight;
                }
                // 8. JAZZ / CLASSICAL
                else if (name.includes("miles davis") || name.includes("louis armstrong") || name.includes("frank sinatra") || name.includes("beethoven") || name.includes("mozart") || name.includes("elvis presley") || name.includes("nina simone") || name.includes("bach") || name.includes("chopin") || name.includes("bill evans") || name.includes("norah jones") || name.includes("hans zimmer") || name.includes("erykah badu") || name.includes("zaz") || name.includes("debussy") || name.includes("chet baker") || name.includes("billie holiday") || name.includes("duke ellington") || name.includes("amy winehouse") || name.includes("charles aznavour") || name.includes("wagner") || name.includes("werdi") || name.includes("schubert") || name.includes("max richter") || name.includes("strauss") || name.includes("fazıl say") || name.includes("gülsin onay") || name.includes("tchaikovsky") || name.includes("diana krall") || name.includes("john coltrane") || name.includes("sarah vaughan") || name.includes("galt macdermot") || name.includes("julie london") || name.includes("nina simone")) {
                    genreCounts["jazz"] = (genreCounts["jazz"] || 0) + weight;
                }
                // 9. ALTERNATIVE
                else if (name.includes("the neighbourhood") || name.includes("twenty one pilots") || name.includes("gorillaz") || name.includes("nirvana") || name.includes("paramore") || name.includes("chase atlantic") || name.includes("canozan") || name.includes("evanescence") || name.includes("tv girl") || name.includes("muse") || name.includes("the 1975") || name.includes("weezer") || name.includes("pinhani") || name.includes("tom odell") || name.includes("three days grace") || name.includes("mother mother") || name.includes("melanie martinez") || name.includes("lorde") || name.includes("cage the elephant") || name.includes("foster the people") || name.includes("fiona apple") || name.includes("björk") || name.includes("the kooks") || name.includes("wallows") || name.includes("yaşlı amca") || name.includes("phoebe bridgers") || name.includes("dolere") || name.includes("perdenin ardındakiler") || name.includes("büyük ev ablukada") || name.includes("jeff buckley") || name.includes("son feci bisiklet") || name.includes("temper city") || name.includes("kings of leon")) {
                    genreCounts["alternative"] = (genreCounts["alternative"] || 0) + weight;
                }
            }
        });

        console.log("Ağırlıklı Tür Puanları:", genreCounts);

        let topGenre;

        if (Object.keys(genreCounts).length > 0) {
            let maxScore = Math.max(...Object.values(genreCounts));
            
            let tiedGenres = Object.keys(genreCounts).filter(g => genreCounts[g] === maxScore);
            
            if (tiedGenres.length > 1) {
                console.log("DİKKAT: Türler arasında eşitlik var!", tiedGenres);
                console.log("Bu seçenekler arasından biri rastgele seçiliyor...");
            } else {
                console.log("Lider tür belirlendi:", tiedGenres[0]);
            }
            
            topGenre = tiedGenres[Math.floor(Math.random() * tiedGenres.length)];
        } else {
            topGenre = "Bilinmiyor";
        }

        console.log("Senin Gerçek Türün:", topGenre);
        displayResult(topGenre);

    } catch (error) {
        console.error("Analiz sürecinde hata:", error);
        displayResult("Bilinmiyor");
    }
}

function getPersonalityMatch(genre) {
    const g = (genre || "Bilinmiyor").toLowerCase();
    
    if (g.includes("metal") || g.includes("punk")) 
        return { 
            title: "You're the Annoyance Itself!", 
            desc: "Powerful riffs and pure energy are in your nature.", 
            image: "https://files.catbox.moe/kmwd23.jpg", 
            details: "Yes, you're absolutely right! The thing that you swear it's music is such disturbing, even people lost their hearing ability! Such a great music that you must be so bored of hearing normal melodies and you're probably a masochist because of listening that noise. Keep listen it bro we won't say anything anymore."
        };

    if (g.includes("hyperpop") || g.includes("techno") || g.includes("house") || g.includes("electronic")) 
        return { 
            title: "You're a Party Diva!", 
            desc: "BPM is your pulse! Moving constantly is your lifestyle.", 
            image: "https://files.catbox.moe/ppp1b2.jpg", 
            details: "Yeah, keep thinking that you're absolute star and queen. Put your glittery makeup and mini shorts to hide your lack of self-confidence and ugliness. Oh, also don't forget to dye your hair blue and do y2k makeup trends that you saw on tiktok. Now grab your wired earphones and listen your ultra autotuned songs."
        };

    if (g.includes("rock")) 
        return { 
            title: "You're the Legend In Your Own Mind!", 
            desc: "Seeking deep meaning in your own world.", 
            image: "https://files.catbox.moe/24mbcl.jpg", 
            details: "Oh, of course that noise that you always listen is the real music. You can just keep listen rock songs to mention your ancestors in 80s. Bro you're not that rockstar that you always take them as a idol when you apply black eyeliner. Grab your ripped jeans and old ahh hoodie to just play your electro in your dirty garage."
        };

    if (g.includes("rap") || g.includes("hip hop")) 
        return { 
            title: "You Street N!gga!", 
            desc: "Life's rhythm from the streets.", 
            image: "https://files.catbox.moe/0co4cq.jpg", 
            details: "Okay bro, you're so dangerous and living on the streets since you're 13 years old. Also pull your baggy jeans up, your underwear is showing. You don't even know how to use a gun but it's okay just keep listening rap and act like you're a part of a gang, we don't judge."
        };

    if (g.includes("jazz") || g.includes("classical") || g.includes("blues") || g.includes("piano")) 
        return { 
            title: "You're the Musical Theory Elitist!", 
            desc: "Depth, peace, and quality are everything to you.", 
            image: "https://files.catbox.moe/tcil5h.jpg", 
            details: "Yeah bro we don't know music but you know everything about it, you can even play instruments without notes like it's a talent. That improvisation does not even sound like a music, it's just mix of some big ahh trumpets' sounds. Go up on stage at that small pub and keep playing songs like someone cares about your music theory."
        };

    if (g.includes("k-pop") || g.includes("j-pop") || g.includes("korean")) 
        return { 
            title: "You're the Oppa!", 
            desc: "Colorful, energetic, and flawless rhythm.", 
            image: "https://files.catbox.moe/3is7e1.jpg", 
            details: "Bro, keep admire the same looking idols that make stupid things to just look cute in front of their fans. Don't forget to collect their photo cards and also memorize their whole choreography like you don't have more important work to do. Pull your sweater's sleeves on your hands, eat your tteokbokki and worship your bias. (Also it's Rosé not ROSE)" 
        };

    if (g.includes("indie") || g.includes("dream pop")) 
        return { 
            title: "You're a Daydreaming Queen!", 
            desc: "Your imagination is limitless.", 
            image: "https://files.catbox.moe/tlfwjj.jpg", 
            details: "Oh, you’re so misunderstood and of course you're different from the masses. We get it, nobody understands you, okay. Now put your thrifted sweater on, grab your own big ahh headphones and go back to discovering bands that have 100 listeners monthly." 
        };

    if (g.includes("alternative") || g.includes("emo")) 
        return { 
            title: "You're the Main Ahh Character!", 
            desc: "Your emotions are deep and complex.", 
            image: "https://files.catbox.moe/yqfpth.jpg", 
            details: "Yeah, you think you're so edgy and different from everyone else. You probably hate popular things but only listen popular alt songs that trending on tiktok. Of course nobody listens that alt band that you swear it's so niche (has 20 million listener in month). Put your Shein ahh clothes on and keep thinking you're the edgy Pinterest guy."
        };

    if (g.includes("pop")) 
        return { 
            title: "You're Ariana Grenade!", 
            desc: "You radiate joy and set the trends.", 
            image: "https://files.catbox.moe/6uryfu.jpg", 
            details: "You're just a trend hopper who just listens the famous pop songs that plays on tiktok trends for just two weeks. But it's okay, just memorise the lyrics and dance; you're gonna forget them after went to only one Zara Larsson concert after all." 
        };

    return { 
        title: "Original Soul", 
        desc: " Amazing ",
        image: "https://i.pinimg.com/736x/31/ca/52/31ca525fe5cb9ba2fe8fae843264f38f.jpg",
        details: "Your music taste is so weird that even we can't roast you properly. You are truly built different (or just insane). Do you think you are different from everyone? Just wake up bro."
    };
}

function displayResult(topGenre) {
    const loading = document.getElementById('loading-screen');
    const result = document.getElementById('result-screen');
    const personality = getPersonalityMatch(topGenre);

    const g = topGenre.toLowerCase();
    let bgClass = "bg-default"; 

    if (g.includes("rock")) bgClass = "bg-rock";
    else if (g.includes("metal") || g.includes("punk")) bgClass = "bg-metal";
    else if (g.includes("indie") || g.includes("dream pop")) bgClass = "bg-indie";
    else if (g.includes("hyperpop") || g.includes("techno") || g.includes("electronic")) bgClass = "bg-hyperpop";
    else if (g.includes("rap") || g.includes("hip hop")) bgClass = "bg-rap";
    else if (g.includes("jazz") || g.includes("classical") || g.includes("piano")) bgClass = "bg-jazz";
    else if (g.includes("k-pop") || g.includes("j-pop")) bgClass = "bg-kpop";
    else if (g.includes("alternative") || g.includes("emo")) bgClass = "bg-alternative";
    else if (g.includes("pop")) bgClass = "bg-pop";

    setTimeout(() => {
        if (loading) loading.style.display = 'none';
        
        document.body.className = bgClass; 
        
        if (result) {
            result.style.display = 'block';
        }

        const extraBox = document.querySelector('.resultbox');
        if (extraBox) extraBox.innerHTML = `<p>${personality.details}</p>`;
        
        const imgElement = document.getElementById('personality-img'); 
        if (imgElement) imgElement.src = personality.image; 

        const topGenreElement = document.getElementById('top-genre');
        if (topGenreElement) topGenreElement.innerHTML = `<b>YOUR MUSIC GENRE: ${topGenre.toUpperCase()}</b>`;
        
        const titleElement = document.getElementById('personality-title');
        if (titleElement) titleElement.innerText = personality.title;
        
        const descElement = document.getElementById('personality-desc');
        if (descElement) descElement.innerText = personality.desc;

    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    analyzePersonality();
});