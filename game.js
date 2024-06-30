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

document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener('click', (e) => {
        let userChosenColor = e.target.id;
        userClickedPattern.push(userChosenColor);
        animateWhenPress(userChosenColor);
        sounds(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function animateWhenPress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            userClickedPattern = [];
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        document.getElementById("level-title").textContent = "Game Over, Press any key to restart";
        
        document.body.classList.add("game-over");
        
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        started = false;
    }
}