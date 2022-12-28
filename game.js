var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var started =false;
var level = 0;

// $(document).keypress( function () {
//     if(!started){
//         $("#level-title").text("Level " + level); 
//         nextSequence();
//         started =true;
//     } 
// });

$(".start").click( function () {
    if(!started){
        $("#level-title").text("Level " + level); 
        nextSequence();
        started =true;
        animatePress($(this).attr("id"));
        
    } 
});
$(".btn").click(function () {

    var userChoosenColour = $(this).attr("id");
    userClickPattern.push(userChoosenColour);

    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentlevel) {

    if (gamePattern[currentlevel] === userClickPattern[currentlevel]) {
        // console.log("success");

        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Try again");
        $("#start").text("Try again");
        
        $(".start").click(()=>{
            setTimeout(function() {
                $("#start").text("start"); 
                }, 50);
        })
        
        setTimeout(function() {
            $("body").removeClass("game-over"); 
            }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickPattern =[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}