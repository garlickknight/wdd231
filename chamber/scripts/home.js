// Config: set your OpenWeatherMap API key and chamber location (lat/lon).
const OWM_API_KEY = 'REPLACE_WITH_YOUR_API_KEY';
const LAT = 47.657;   // example: Preston/Idaho coordinates - replace as needed
const LON = -111.876;

// Utility: select random N elements from array
function pickRandom(arr, n) {
    const copy = arr.slice();
    const result = [];
    while (result.length < n && copy.length) {
        const i = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(i, 1)[0]);
    }
    return result;
}

// Weather: fetch and render current + 3-day forecast using One Call API (v2.5)
async function loadWeather() {
    try {
        if (!OWM_API_KEY || OWM_API_KEY === 'REPLACE_WITH_YOUR_API_KEY') {
            document.getElementById('weatherNow').innerHTML = '<p>Please set your OpenWeatherMap API key in the script to load real weather.</p>';
            return;
        }
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,hourly,alerts&units=imperial&appid=${OWM_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather fetch failed');
        const data = await res.json();

        // current
        const cur = data.current;
        const nowHTML = `
                    <p style="margin:.25rem 0"><strong>${Math.round(cur.temp)}°F</strong> — ${cur.weather[0].description}</p>
                    <p style="margin:.25rem 0;opacity:.85">Feels like ${Math.round(cur.feels_like)}°F • Humidity ${cur.humidity}%</p>
                `;
        document.getElementById('weatherNow').innerHTML = nowHTML;

        // 3-day forecast (skip today, use next 3 days)
        const forecastEl = document.getElementById('forecast');
        forecastEl.innerHTML = '';
        const days = data.daily.slice(1, 4); // next 3 days
        days.forEach(d => {
            const date = new Date(d.dt * 1000);
            const label = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
            const card = document.createElement('div');
            card.style.background = '#fff';
            card.style.padding = '.5rem';
            card.style.borderRadius = '8px';
            card.style.minWidth = '110px';
            card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            card.innerHTML = `
                        <div style="font-weight:700">${label}</div>
                        <div style="font-size:1.05rem;margin:.25rem 0">${Math.round(d.temp.day)}°F</div>
                        <div style="opacity:.85;font-size:.95rem">${d.weather[0].main}</div>
                    `;
            forecastEl.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        document.getElementById('weatherNow').innerHTML = '<p>Unable to load weather at this time.</p>';
    }
}

// Spotlights: load members.json, pick 2 or 3 gold/silver members at random and render
async function loadSpotlights() {
    try {
        const res = await fetch('data/members.json');
        if (!res.ok) throw new Error('Members fetch failed');
        const json = await res.json();
        const members = json.members || [];
        const eligible = members.filter(m => {
            const level = (m.membership || '').toLowerCase();
            return level === 'gold' || level === 'silver';
        });
        if (!eligible.length) {
            document.getElementById('spotlightContainer').innerHTML = '<p>No eligible members found.</p>';
            return;
        }
        const count = Math.min(3, Math.max(2, Math.floor(Math.random() * 2) + 2)); // 2 or 3
        const picks = pickRandom(eligible, count);
        const container = document.getElementById('spotlightContainer');
        container.innerHTML = '';
        for (const m of picks) {
            const card = document.createElement('div');
            card.className = 'spot';
            card.innerHTML = `
                        <img class="logo" src="${m.logo || 'images/logo-placeholder.png'}" alt="${m.name} logo" />
                        <div style="flex:1">
                            <div style="font-weight:700">${m.name}</div>
                            <div style="font-size:.95rem;color:#444;margin:.25rem 0">${m.address || ''}</div>
                            <div style="font-size:.95rem;opacity:.85">${m.phone || ''}</div>
                            <div style="margin-top:.35rem"><a href="${m.website || '#'}" target="_blank" rel="noopener" style="color:var(--brand);text-decoration:none;font-weight:600">${m.website ? 'Visit website' : ''}</a></div>
                            <div style="margin-top:.3rem;font-size:.8rem;color:#666">Member: ${m.membership}</div>
                        </div>
                    `;
            container.appendChild(card);
        }
    } catch (err) {
        console.error(err);
        document.getElementById('spotlightContainer').innerHTML = '<p>Unable to load member spotlights.</p>';
    }
}

// initialize
document.getElementById('year').textContent = new Date().getFullYear();
loadWeather();
loadSpotlights();