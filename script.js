const h = document.querySelector("h1");
const h2 = document.getElementById("test");
const blob = document.getElementById("blob");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const closeBtn = document.getElementById("closeBtn");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

h.addEventListener('mouseover', mouseoverEvent)
// h2.addEventListener('mouseover', mouseoverEvent)

document.addEventListener('pointermove', (event) => {
    const { pageX, pageY } = event;

    blob.animate({
        left: `${pageX}px`,
        top: `${pageY}px`
    }, { duration: 3000, fill: "forwards" })
})

function mouseoverEvent(event) {

    const hValue = event.target.dataset.value;
    let interations = 0;
    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if (letter === " ") {
                    return " "
                }
                if (index < interations) {
                    return hValue[index];
                } return randomLetter();
            })
            .join("");

        if (interations >= hValue.length) {
            clearInterval(interval);
        }

        interations += 1 / 4;
    }, 30);




}

function randomLetter() {
    return letters[Math.floor(Math.random() * 26)];
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll(".word");
hiddenElements.forEach((ele) => observer.observe(ele));



menuBtn.addEventListener('click', () => {

    menuBtn.animate({
        opacity: 0,
        rotate: "-180deg"
    },
        {
            duration:350,
            fill:"forwards",
            easing:"ease"
    });

    menu.animate({
        transform: "translate(0)"
    },
    {
        duration:500,
        fill:"forwards",
        easing:"ease"
    });
    
});

closeBtn.addEventListener('click', ()=>{
    menu.animate({
        transform: "translate(-100%)"
    },
    {
        duration:350,
        fill:"forwards",
        easing:"ease"
    })

    menuBtn.animate({
        opacity: 1,
        rotate: "180deg"
    },
        {
            duration:500,
            fill:"forwards",
            easing:"ease"
    });
})