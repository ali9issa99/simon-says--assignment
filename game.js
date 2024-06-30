const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0

document.addEventListener('keypress', () => {

    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`
        nextSequence();
        started = true
        
    }

})

function nextSequence(){
    level++
    document.querySelector("#level-title").textContent = `Level ${level}`
    let randomNumber= Math.floor(Math.random()*4)
    let randomColor=buttonColors[randomNumber]
    gamePattern.push(randomColor)
    animation();
    

    
}

function animation(){
    for (let i=0; i<gamePattern.length;i++){
        setTimeout(() => {
            let color = gamePattern[i];
            document.getElementById(color).classList.add("pressed");
            
            setTimeout(() => {
                document.getElementById(color).classList.remove("pressed");
            }, 100);
        }, 500 * i);
    }
}

function sounds(sound){
    var audio = new Audio(`sounds/${sound}.mp3`);
    audio.play();
}

