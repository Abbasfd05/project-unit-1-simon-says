//-------------------------------- Constants --------------------------------//
const topRight = document.querySelector('#topRight');
const topLeft = document.querySelector('#topLeft');
const bottomLeft = document.querySelector('#bottomLeft');
const bottomRight = document.querySelector('#bottomRight');
const Power = document.querySelector('#on');
const Strict = document.querySelector('#strict');
const startButton = document.querySelector('#start');
const turnDisplay = document.querySelector('#turn');
const choices = ['topRight', 'topLeft', 'bottomLeft', 'bottomRight'];

//-------------------------------- Variables --------------------------------//
let ComputerSequence = [];
let playerSequence = [];
let level = 0;
let strictMode = false;
let PowerOn = false;
let playerTurn = false;
let noise=true;
let triesLeft = 3;

//-------------------------------- Functions --------------------------------//

const initializeGame = () => {
  if (Power.checked) {
    PowerOn = true;
    turnDisplay.textContent = '0';
    console.log('Game Started');
  } else {
    PowerOn = false;
    turnDisplay.textContent = '';
    resetGame();
    console.log('Game Not Started');
  }
};

const initializeGameStrict = () => {
  if (Strict.checked) {
    strictMode = true;
    console.log('Strict Game');
    turnDisplay.textContent = '0';
  } else {
    turnDisplay.textContent = '0';
    strictMode = false;
    console.log('none-strict Game');
  }
};

const resetGame = () => {
  ComputerSequence = [];
  playerSequence = [];
  level = 0;
  playerTurn = false;
  triesLeft=3;
};

const flashButton = (id) => {
  const button = document.querySelector('#' + id);
  button.classList.add('flash');
  setTimeout(() => {
    button.classList.remove('flash');
  }, 300);
};

const playSequence = () => {
  playerTurn = false;
  let i = 0;

  const interval = setInterval(() => {
    const id = ComputerSequence[i];
    flashButton(id);     
    soundMap[id]();       
    i++;
    if (i >= ComputerSequence.length) {
      clearInterval(interval);
      playerTurn = true;
    }
  }, 700);
};

const nextRound = () => {
  level++;
  turnDisplay.textContent = level;
  playerSequence = [];

  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  ComputerSequence.push(randomChoice);

  playSequence();
};

const startGame = () => {
  resetGame();
  nextRound();
};

const getPlayerChoice = (event) => {
  const choice = event.target.id;
  playerSequence.push(choice);
  flashButton(choice);
  checkAnswer();
};

const checkAnswer = () => {
  const currentIndex = playerSequence.length - 1;

 if (playerSequence[currentIndex] !== ComputerSequence[currentIndex]) {
  if (strictMode) {
    turnDisplay.textContent = 'Game Over!';
    setTimeout(startGame, 1000);
  } else {
    triesLeft--;

    if (triesLeft <= 0) {
      turnDisplay.textContent = 'Game Over!';
      setTimeout(startGame, 1000);
    } else {
      turnDisplay.textContent = 'You have ' + triesLeft + ' tries left!';
      setTimeout(() => {
        playerSequence = [];
        turnDisplay.textContent = level;
        playSequence();
      }, 1000);
    }
  }
  return;
}


  if (playerSequence.length === ComputerSequence.length) {
    if (level === 6) {
      turnDisplay.textContent = 'WIN!';
      playerTurn = false;
      return;
    }
    setTimeout(nextRound, 1000);
  }
};

const playGame = (event) => {
  if (playerTurn && PowerOn) {
    getPlayerChoice(event);
  }
};
function one() {
    if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;

}
function two() {
    if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  
}
function three() {
    if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
 
}
function four() {
    if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;

}
const soundMap = {
  topRight: one,
  topLeft: two,
  bottomLeft: three,
  bottomRight: four
};

//----------------------------- Event Listeners -----------------------------//
Power.addEventListener('click', initializeGame);
Strict.addEventListener('click', initializeGameStrict);

startButton.addEventListener('click', () => {
  if (PowerOn) {
    startGame();
     
  }
});

topRight.addEventListener('click', () => {
    one();
    playGame(event);
});
topLeft.addEventListener('click', () => {
    two();
    playGame(event);
});
bottomLeft.addEventListener('click', () => {
    three();
    playGame(event);
});
bottomRight.addEventListener('click', () => {
    four();
    playGame(event);
});
