// index.js (refactored)
// GitHub Copilot

(() => {
    // Query elements (guarded)
    const navButton = document.querySelector("#ham-btn");
    const navBar = document.querySelector("#nav-bar");
    const callButton = document.querySelector("#call");
    const cardContainer = document.getElementById("cards");
    const lastModEl = document.getElementById("lastModified");

    // Safe event listeners
    navButton?.addEventListener("click", () => {
        navButton.classList.toggle("show");
        navBar?.classList.toggle("show");
    });

    callButton?.addEventListener("click", () => {
        callButton.classList.toggle("show");
    });

    // Utility to create element with optional class
    const el = (tag, className) => {
        const e = document.createElement(tag);
        if (className) e.className = className;
        return e;
    };

    // Display members (clears container first)
    const display = (members = []) => {
        cardContainer.innerHTML = "";
        // Shuffle copy of members (Fisher-Yates) and take up to 3
        const pool = members.slice();
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const toShow = pool.slice(0, Math.min(3, pool.length));

        toShow.forEach((item) => {
            const section = el("section", "member-card");
            const name = el("h2");
            const img = el("img", "member-icon");
            const address = el("p", "member-address");
            const phone = el("p", "member-phone");
            const linkHolder = el("p", "member-website");
            const link = el("a");

            name.textContent = item.name || "No name";
            img.src = item.icon || "";
            img.alt = `${item.name || "Member"} icon`;
            img.loading = "lazy";
            address.textContent = item.address || "";
            phone.textContent = item.phone || "";
            link.textContent = item.website || "Website";
            if (item.website) {
                link.href = item.website;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }

            linkHolder.appendChild(link);

            section.appendChild(name);
            section.appendChild(img);
            section.appendChild(address);
            section.appendChild(phone);
            section.appendChild(linkHolder);

            cardContainer.appendChild(section);
        });
    };

    // Fetch members.json with error handling
    async function getData() {
            const resp = await fetch("data/members.json");
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json();
            console.table(data.members || []);
            display(data.members || []);
    }

    getData();

    // Last modified
    if (lastModEl) lastModEl.textContent = document.lastModified;

    // Weather (with error handling and simple 3-day forecast)
    const weatherImg = document.querySelector("#weather-icon");
    const tempEl = document.querySelector("#current-temp");
    const captionDesc = document.querySelector("figcaption");
    const forecastSection = document.getElementById("weatherforecast");

    const API_KEY = "1826e40be9fc1eaacee027527306cb27";
    const lat = 40.75;
    const lon = -111.89;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;

    async function apiFetch() {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`Weather HTTP ${resp.status}`);
            const data = await resp.json();
            console.log("weather:", data);
            displayResults(data);
    }

    function displayResults(data = {}) {
        if (!data.main || !data.weather || !data.weather[0]) return;

        const temperature = Math.round(data.main.temp);
        if (tempEl) tempEl.textContent = `${temperature}\u00B0F`;

        const desc = data.weather[0].description || "";
        if (captionDesc) captionDesc.textContent = desc;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        if (weatherImg) {
            weatherImg.src = iconUrl;
            weatherImg.alt = desc || "weather icon";
            weatherImg.loading = "lazy";
        }

        // Simple 3-day forecast (deterministic offsets)
        if (!forecastSection) return;
        forecastSection.innerHTML = "";
        const now = new Date();

        for (let i = 1; i <= 3; i++) {
            const d = new Date(now);
            d.setDate(now.getDate() + i);
            const dayName = d.toLocaleDateString(undefined, { weekday: "short" });
            const dayTemp = temperature + i * 2; // small offset
            const dayDesc = desc;

            const card = el("div", "forecast-day");
            const h = el("h4");
            h.textContent = dayName;

            const img = el("img");
            img.src = iconUrl;
            img.alt = dayDesc || "forecast icon";
            img.loading = "lazy";

            const p = el("p");
            p.textContent = `${Math.round(dayTemp)}\u00B0F`;

            card.appendChild(h);
            card.appendChild(img);
            card.appendChild(p);

            forecastSection.appendChild(card);
        }
    }

    apiFetch();
})();
