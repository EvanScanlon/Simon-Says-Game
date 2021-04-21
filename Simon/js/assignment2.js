//consulted tutorials on freecodecamp.org to assist with logic and structure, and applied it to this problem

let order = []; //variables
let playerOrder = [];
let flash;
let score;
let good;
let compscore;
let intervalId;
let select = true;
let on = false;
let end;
let highscore = 0;
let time;

const scoreCounter = document.querySelector("#score");    //values to be changed
const highScoreCounter = document.querySelector("#highscore");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

startButton.addEventListener('click', (event) => {  //the button that starts the program
  if(on==false){
    on = true;
    document.getElementById("togglecircle").style.backgroundColor="green";  //light turns green when turned on
    scoreCounter.innerHTML = "-";
  }
  else{
    on=false;
    document.getElementById("togglecircle").style.backgroundColor="red";  //light turns red when turned off
    scoreCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId); 
  }
  if (on || end) {
    play();
  }
});

function play() { //begins game
  end = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  score = 1;
  scoreCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);  //generates the next button to light up
  }
  compscore = true;
  intervalId = setInterval(gamescore, 800);
}

function gamescore() {
  on = false;

  if (flash == score) {
    clearInterval(intervalId);
    compscore = false;
    clearColor();
    on = true;
  }

  if (compscore) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 250);
  }
  //time = setTimeout(function() { endGame(); }, 5000);
}

function one() {  //functions to make the buttons change colours when clicked
  select = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  select = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  select = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  select = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() { //sets the buttons to their original colour
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() { //lights up all the buttons at once
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', (event) => {  //check if the correct button has been clicked
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!end) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!end) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!end) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!end) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {  //checks the status of the game
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if(score>highscore){  //stores highscore
    highscore=score;
  }

  if (good == false) {  //occurs when the player fails the game
    //clearTimeout(time);
    flashColor();
    scoreCounter.innerHTML = "X";
    document.getElementById("togglecircle").style.backgroundColor="red";
    setTimeout(() => {
      scoreCounter.innerHTML = score; //changes the numbers displayed
      highScoreCounter.innerHTML = score;
      clearColor();
        compscore = true;
        flash = 0;
        playerOrder = [];
        good = true;
        endGame();
        intervalId = setInterval(gamescore, 800);
    }, 800);

    select = false;
  }

  if (score == playerOrder.length && good && !end) {  //continues the game
    //clearTimeout(time);
    score++;
    playerOrder = [];
    compscore = true;
    flash = 0;
    scoreCounter.innerHTML = score;
    if(score>highscore){
    highScoreCounter.innerHTML = score;
    }
    intervalId = setInterval(gamescore, 800);
  }

}

function endGame() {  //ends the current game and resets the game
  //clearTimeout(time);
  flashColor();
  scoreCounter.innerHTML = "End!";
  highScoreCounter.innerHTML = highScore;
  on = false;
  document.getElementById("togglecircle").style.backgroundColor="red";
  end = true;
}






