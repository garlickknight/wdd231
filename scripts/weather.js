const weather = document.querySelector("#weather-icon");
const temp = document.querySelector("#current-temp");
const captionDesc = document.querySelector('figcaption');

const myApi = "bff7a7671fa5d9a241cad669ec6b014b";
const long = "49.75026562629286";
const lat = "6.635714416542802";

const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myApi}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();
