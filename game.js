
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

var started=false;
var level=0;

$(document).on("keydown", function()
{
  if(!started){
    $("#level-title").text("Level "+ level);
  nextSequence();
  started=true;
}});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber= Math.floor((Math.random()*4));
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
}


//Functions on cick of a button by user
$(".btn").on("click", function()
{
  userChosenColour =$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


//Animate Click
function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
    }, 100)
  }


//Play Audio
function playSound(name){
    var snd=new Audio("sounds/"+ name +".mp3");
    snd.play();
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("Success");
      if(gamePattern.length===userClickedPattern.length)
        {
          setTimeout(function(){
            nextSequence();
          }, 1000);
        }
  }
  else{
    console.log("Wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver(){
  gamePattern=[];
  userClickedPattern=[];
  level=0;
  started=false;
}
