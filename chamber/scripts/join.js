const navButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const cardContainer = document.getElementById("mem");
const lastModEl = document.getElementById("lastModified");

// Safe event listeners (self written)
navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navBar?.classList.toggle("show");
});
async function getData() {
    const resp = await fetch("data/members.json");
    const data = await resp.json();
    console.table(data.members);
    display(data.members);
}
getData();

// Display members (clears container first) (self written)
const display = (members = []) => {
    cardContainer.innerHTML = "";
    // AI assisted to help me learn the slice concept (I wrote the code).
    const toShow = members.slice(0, 4);
    // self written
    toShow.forEach(item => {
        const section = document.createElement('section');
        const title = document.createElement('h3')
        const holder = document.createElement("dialog");
        const dbutt = document.createElement("button");
        const obutt = document.createElement("button");
        const ihold = document.createElement("div");

        dbutt.textContent = "Close";
        obutt.textContent = "View Benefits";

        //AI helped me know how to insert content into the model. 
        ihold.innerHTML = `
            <h2><strong>Membership Level:</strong> ${item.membershipLevel}</h2>
            <h3>${item.membershipLevel * 10}$/month</h3>
            <p><strong>Benefits:</strong></p>
            <ul>
                <li>${item.membershipLevel === 1 ? 'Access to monthly networking events' :
                    item.membershipLevel === 2 ? 'Priority booth placement at trade shows' :
                    item.membershipLevel === 3 ? 'Exclusive executive roundtable sessions' :
                        'Featured spotlight in chamber newsletter'}</li>
                <li>${item.membershipLevel === 1 ? 'Basic business directory listing' :
                item.membershipLevel === 2 ? 'Enhanced online profile with logo' :
                    item.membershipLevel === 3 ? 'Premium homepage banner advertising' :
                        'VIP access to all chamber facilities'}</li>
                <li>${item.membershipLevel === 1 ? 'Quarterly newsletter subscription' :
                item.membershipLevel === 2 ? 'Free workshop attendance (up to 3/year)' :
                    item.membershipLevel === 3 ? 'Unlimited training and development courses' :
                        'Dedicated account manager'}</li>
                <li>${item.membershipLevel === 1 ? '10% discount on event tickets' :
                item.membershipLevel === 2 ? '25% discount on all chamber services' :
                    item.membershipLevel === 3 ? 'Complimentary meeting room bookings' :
                        'Direct introductions to key decision makers'}</li>
            </ul>
        `;
        holder.appendChild(ihold);
        holder.appendChild(dbutt);

        obutt.addEventListener("click", () => {
            holder.showModal();
        });

        dbutt.addEventListener("click", () => {
            holder.close();
        });

        title.textContent = `Membership Level: ${item.membershipLevel}`;

        section.appendChild(title);
        section.appendChild(obutt);
        section.appendChild(holder);

        cardContainer.appendChild(section);
    });
};


// Last modified
if (lastModEl) lastModEl.textContent = document.lastModified;
