const gallery = document.getElementById("gallery");

window.addEventListener('mousemove',(e)=>{
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const xDecimal = mouseX /window.innerWidth;
    const yDecimal =mouseY/window.innerHeight;

    const maxX =  gallery.offsetWidth -window.innerWidth;
    const maxY = gallery.offsetHeight - window.innerHeight;

    const posX = maxX * xDecimal * -1;
    const posY = maxY * yDecimal * -1;

    gallery.animate({
        transform: `translate(${posX}px, ${posY}px)`
    },
    {
        duration: 5000,
        fill:"forwards",
        easing:"ease"
    });
    // gallery.style.transform = `translate(${posX}px, ${posY}px)`
})