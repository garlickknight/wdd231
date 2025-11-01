// Hamburger button and navigation menu code
// Hamburger btn selector
const navbutton = document.querySelector("#ham-btn");
// navigation bar selector 
const navBar = document.querySelector("#nav-bar");
// event listener to make the navigation bar work.
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle("show")
});

var date = new Date();
var year = date.getFullYear();
document.getElementById("currentyear").innerHTML = year;
document.getElementById("lastModified").innerHTML = document.lastModified;



const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


const list = document.getElementById("list");
const css = document.getElementById("css");
const all = document.getElementById("all");
const wdd = document.getElementById("wdd");
const credits = document.getElementById("credits")
let total = 0;
all.addEventListener('click', () => {
    total = 0;
    list.innerHTML = '';
    courses.forEach(display => {
        if (display.completed === true) {
            const li = document.createElement("li");
            li.textContent = `${display.subject} ${display.number} (completed)`;
            list.appendChild(li);
            total = total + display.credits;


        } else {
            const li = document.createElement("li");
            li.textContent = `${display.subject} ${display.number}`;
            list.appendChild(li);
            total = total + display.credits;
        }
        credits.innerHTML = `The total amount of Credits for these classes are ${total}`;
    });

}); 
courses.forEach(display => {
    total = 0;
     if (display.completed === true) {
        const li = document.createElement("li");
       li.textContent = `${display.subject} ${display.number} (completed)`;
         list.appendChild(li);
         total = total + display.credits;
         
   } else {
       const li = document.createElement("li");
        li.textContent = `${display.subject} ${display.number}`;
         list.appendChild(li);
         total = total + display.credits;
    }
    credits.innerHTML = `The total amount of Credits for these classes are ${total}`;
     
});



css.addEventListener('click', () => {
    total = 0;
    list.innerHTML = '';
    const filtered = courses.filter(c => c.subject === "CSE");
    css.classList.toggle('show');
    filtered.forEach(course => {
        if (course.completed === true) {
            const li = document.createElement("li");
            li.textContent = `${course.subject} ${course.number} (completed)`;
            list.appendChild(li);
            total = total + course.credits;
        }
        else {
            const li = document.createElement("li");
            li.textContent = `${course.subject} ${course.number}`;
            list.appendChild(li);
            total = total + course.credits;

        }
        credits.innerHTML = `The total amount of Credits for these classes are ${total}`;
    });
});

wdd.addEventListener('click', () => {
    total = 0;
    list.innerHTML = '';
    const filtered = courses.filter(c => c.subject === "WDD");
    css.classList.toggle('show');
    filtered.forEach(course => {
        if (course.completed === true) {
            const li = document.createElement("li");
            li.textContent = `${course.subject} ${course.number} (completed)`;
            list.appendChild(li);
            total = total + course.credits;
        }
        else {
            const li = document.createElement("li");
            li.textContent = `${course.subject} ${course.number}`;
            list.appendChild(li);
            total = total + course.credits;

        }
        credits.innerHTML = `The total amount of Credits for these classes are ${total}`;
    });
});





