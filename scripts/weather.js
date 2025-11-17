const weather = document.querySelector("#weather-icon");
const temp = document.querySelector("#current-temp");
const captionDesc = document.querySelector('figcaption');

const myApi = "1826e40be9fc1eaacee027527306cb27";
const lon = "49.75026562629286";
const lat = "6.635714416542802";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApi}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();
