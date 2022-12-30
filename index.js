const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var firstKeyPress = true;

function playSound(color) {
    var audioElement = new Audio("sounds/"+color+".mp3");
    audioElement.play();
}


function nextSequence() {
    level++;
    $("h1").text("Level "+level);
    randomNumber =  Math.floor(Math.random()*4);
    gamePattern.push(buttonColours[randomNumber]);
    $("#"+gamePattern[level-1]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[level-1]);
}

function animatePress(color) {
    $("."+color).addClass("pressed")
    setTimeout( function() {
        $("."+color).removeClass("pressed")
    }, 100);
}

function gameOver() {
    var audioElement = new Audio("sounds/wrong.mp3");
    audioElement.play();
    $("body").addClass("game-over");
    setTimeout( function() {
        $("body").removeClass("game-over");
    }, 200);
    firstKeyPress = true;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("h1").text("Game Over, Press Any Key to Restart");
}

function checkAnswer() {
    for (var i = gamePattern.length-1; i>=0; i--) {
        userClick = userClickedPattern.pop()
        if (userClick != gamePattern[i]) {
            gameOver();
            break;
        }
    }
    if (firstKeyPress == false) {
        setTimeout(nextSequence(), 1000);
    }
}

$(".btn").on("click", function(event) {
    if (firstKeyPress == false) {
        var id = $(this).attr('id');
        userClickedPattern.push(id);
        playSound(id);
        animatePress(id);
        if (userClickedPattern.length == level){
            checkAnswer();
        }
    }
})

$(document).on("keypress", function(){
    if (firstKeyPress == true) {
        firstKeyPress = false;
        nextSequence();
    }
})