
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
// AI assisted in places that I was stuck on this part of the assingment. 
const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const img = document.createElement('img');
        const birth = document.createElement('p');
        const place = document.createElement('p');

        fullName.textContent = prophet.name + " " + prophet.lastname;
        birth.textContent = "Birthday:" + " " + prophet.birthdate;
        place.textContent = ` Birth place: ${prophet.birthplace}`;
        img.setAttribute('src', prophet.imageurl);
        img.setAttribute('alt', `${prophet.name} ${prophet.lastname} — ${prophet.order}th Latter-day President`);
        img.setAttribute('loading', 'lazy');
        img.setAttribute('width', '340');
        img.setAttribute('height', '440');


        card.appendChild(fullName);
        card.appendChild(birth);
        card.appendChild(place);
        card.appendChild(img);
        cards.appendChild(card);
    });
};

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets); // temporary testing of data response
    displayProphets(data.prophets);
}

getProphetData();
