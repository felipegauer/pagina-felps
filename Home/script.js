const h = document.querySelector("h1");
const h2 = document.getElementById("test");
const blob = document.getElementById("blob");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

h.addEventListener('mouseover', mouseoverEvent)
// h2.addEventListener('mouseover', mouseoverEvent)

document.addEventListener('pointermove', (event)=>{
    const { pageX, pageY} = event;
    
    blob.animate({
        left: `${pageX}px`,
        top: `${pageY}px`
    }, {duration:3000, fill:"forwards"})
})

function mouseoverEvent(event){
    
    const hValue = event.target.dataset.value;
    let interations = 0;
    const interval  = setInterval(()=>{
        event.target.innerText = event.target.innerText.split("")
        .map((letter,index)=> {
            if (letter === " ") {
                return " "
            }
            if (index < interations) {
                return hValue[index];
            } return randomLetter();
        })
        .join("");

        if (interations>=hValue.length) {
            clearInterval(interval);
        }

        interations +=1/4;
    },30);

    
    
    
}

function randomLetter(){
    return letters[Math.floor(Math.random() * 26)];
}

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll(".word");
hiddenElements.forEach((ele)=> observer.observe(ele));
