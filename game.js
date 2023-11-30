var buttonColors = []
buttonColors.push("red", "blue", "green", "yellow");
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOver = true;

function nextSequence () {
    gameOver = false;
    var randomNumber = Math.floor(Math.random()*4);
    setTimeout(function () {
        $("." + buttonColors[randomNumber]).fadeOut(100).fadeIn(100);
        playSound(buttonColors[randomNumber]);
    }, 100);
    gamePattern.push(buttonColors[randomNumber]);
    level++;
    $("h1").text("level " + level);
}



$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));
    if (gamePattern.length===userClickedPattern.length)
        checkPattern();
});

function playSound (name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function (){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress( function() {
    if (gameOver === true) {
        level = 0;
        nextSequence();
        $("body").removeClass("game-over");
    }
});

function checkPattern(clickNum) {
    if (userClickedPattern.toString() === gamePattern.toString()){
        userClickedPattern = [];
        setTimeout(() => {
            nextSequence();    
        }, 1000);
    }

    else {
        startOver();
    }
}

function startOver (){
    setTimeout(() => {
        $("body").addClass("game-over");
        gameOver = true;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        $("h1").text("Game Over. Press any key to restart.");
    }, 500);
}