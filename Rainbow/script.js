const canva = document.getElementById("rainbow");
const pen = canva.getContext("2d");
const soundBtn = document.getElementById("sound");


let startTime = new Date().getTime();

const calcNextImpacTime = (currentImapacTime, velocity) => {
    return currentImapacTime + (Math.PI / velocity) * 1000;
}

const arcs = [
    "#ff0000",
    "#ff8700",
    "#ffd300",
    "#deff0a",
    "#a1ff0a",
    "#0aff99",
    "#0aefff",
    "#147df5",
    "#580aff",
    "#be0aff"
].map((color, index) => {
    const audio = new Audio(`./audio/a${index}.wav`)

    audio.volume = 0.02;

    const numLoops = 50 - index;
    const velocity = numLoops * (Math.PI * 2) / 900;
    return {
        color,
        audio,
        nextImpactTime: calcNextImpacTime(startTime, velocity),
        velocity,
        impact: 0
    }
})



let soundEnable = false;

soundBtn.addEventListener('click', () => {
    if (soundEnable) {
        new Audio()
        soundEnable = false;
        soundBtn.children[0].classList.remove("fa-solid", "fa-volume-high");
        soundBtn.children[0].classList.add("fa-solid", "fa-volume-xmark");

    } else {
        soundEnable = true;
        soundBtn.children[0].classList.remove("fa-solid", "fa-volume-xmark");
        soundBtn.children[0].classList.add("fa-solid", "fa-volume-high");
    }
})




const draw = () => {
    const currentTime = new Date().getTime(),
        elapsedTime = (currentTime - startTime) / 1000;

    canva.width = canva.clientWidth;
    canva.height = canva.clientHeight;

    const start = {
        x: canva.width * 0.1,
        y: canva.height * 0.9
    };

    const end = {
        x: canva.width * 0.9,
        y: canva.height * 0.9
    };


    pen.lineWidth = 4;
    


    const center = {
        x: canva.width * 0.5,
        y: canva.height * 0.9
    }

    const length = end.x - start.x;

    const initialArc = length * 0.05;
    const spacing = (length / 2 - initialArc) / arcs.length;

    arcs.forEach((arc, index) => {
        const arcRadius = initialArc + (index * spacing);

        pen.beginPath();
        pen.strokeStyle = arc.color;
        pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
        pen.stroke();


    });

    pen.beginPath();
    pen.strokeStyle = "white";
    pen.moveTo(start.x, start.y);
    pen.lineTo(end.x, end.y);
    pen.stroke();

    arcs.forEach((arc,index)=>{
        const arcRadius = initialArc + (index * spacing);

        const maxAngle = Math.PI * 2;

        const velocity = arc.velocity;
        const distance = Math.PI + (elapsedTime * velocity);
        const modDistance = distance % maxAngle;

        const adjustDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;

        const x = center.x + arcRadius * Math.cos(adjustDistance),
            y = center.y + arcRadius * Math.sin(adjustDistance);


        pen.beginPath();

        if (currentTime >= arc.nextImpactTime - 1) {
            if (soundEnable) {
                arc.audio.play();

            }
            pen.strokeStyle = arc.color;
            pen.fillStyle = arc.color
            arc.impact = 12;
            arc.nextImpactTime = calcNextImpacTime(arc.nextImpactTime, arc.velocity)
        } else {
            if (arc.impact < 0) {
                pen.strokeStyle = "white";
                pen.fillStyle = "white";
            } else {
                pen.strokeStyle = arc.color;
                pen.fillStyle = arc.color
                arc.impact--;
            }

        }

        pen.arc(x, y, length * 0.0065, 0, Math.PI * 2);
        pen.fill();
        pen.stroke();
    })



    requestAnimationFrame(draw);
}

draw();