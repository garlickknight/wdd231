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

    // Display members (clears container first)
    const display = (members = []) => {
        cardContainer.innerHTML = "";

        members.forEach((item) => {
            const section = document.createElement("section");
            section.className = "member-card";

            const name = document.createElement("h2");

            const img = document.createElement("img");
            img.className = "member-icon";

            const address = document.createElement("p");
            address.className = "member-address";

            const phone = document.createElement("p");
            phone.className = "member-phone";

            const linkHolder = document.createElement("p");
            linkHolder.className = "member-website";

            const link = document.createElement("a");

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

    // Fetch members.json
    async function getData() {
            const resp = await fetch("data/members.json");
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
            const data = await resp.json();
            console.log("weather:", data);
            displayResults(data);
        }

    function displayResults(data = {}) {

        const temperature = Math.round(data.main.temp);
        tempEl.textContent = `${temperature}\u00B0F`;

        const desc = data.weather[0].description || "";
        captionDesc.textContent = desc;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherImg.src = iconUrl;
        weatherImg.alt = desc || "weather icon";
        weatherImg.loading = "lazy";

        // Simple 3-day forecast (deterministic offsets)
        forecastSection.innerHTML = "";
        const now = new Date();

        for (let i = 1; i <= 3; i++) {
            const d = new Date(now);
            d.setDate(now.getDate() + i);
            const dayName = d.toLocaleDateString(undefined, { weekday: "short" });
            const dayTemp = temperature + i * 2; // small offset
            const dayDesc = desc;

            const card = ("div", "forecast-day");
            const h = ("h4");
            h.textContent = dayName;

            const img = ("img");
            img.src = iconUrl;
            img.alt = dayDesc || "forecast icon";
            img.loading = "lazy";

            const p = ("p");
            p.textContent = `${Math.round(dayTemp)}\u00B0F`;

            card.appendChild(h);
            card.appendChild(img);
            card.appendChild(p);

            forecastSection.appendChild(card);
        }
    }

    apiFetch();
})();
