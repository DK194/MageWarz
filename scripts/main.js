const highscore = document.getElementById('highscore');
const playerHealthBar = document.getElementById('player-hp-bar');
const playerHealthPoints = document.getElementById('player-health-points');
const computerHealthBar = document.getElementById('computer-hp-bar');
const computerHealthPoints = document.getElementById('computer-health-points');
const restartButton = document.getElementById('restart-btn');
const choices = document.querySelectorAll('.player-choice');
const modal = document.querySelector('.modal');
const result = document.getElementById('result');
const initialGameData = {
  playerScore: 0,
  playerHP: 100,
  computerHP: 100
};

choices.forEach(choice => choice.addEventListener('click', playGame));
window.addEventListener('click', clearModal);
restartButton.addEventListener('click', restartGame);

function playGame(e) {
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const turnResult = getTurnResult(playerChoice, computerChoice);

  showTurnResult(turnResult, computerChoice);

  if (initialGameData.playerHP <= 0 || initialGameData.computerHP <= 0) {
    showRoundWinner(computerChoice);
  }

  restartButton.style.display = 'inline-block';
}

function getComputerChoice() {
  const rand = Math.floor(Math.random() * 6 + 1);

  switch (rand) {
    case 1:
      return 'fire';
    case 2:
      return 'water';
    case 3:
      return 'thunder';
    case 4:
      return 'ice';
    case 5:
      return 'wind';
    case 6:
      return 'earth';
  }
}

function getTurnResult(p, c) {
  switch (p) {
    case 'fire':
      switch (c) {
        case 'water':
        case 'earth':
          return 'Computer';
        case 'ice':
        case 'wind':
          return 'Player';
        case 'thunder':
          return 'Costly Draw';
        case 'fire':
          return 'Draw';
      }
    case 'water':
      switch (c) {
        case 'ice':
        case 'thunder':
          return 'Computer';
        case 'earth':
        case 'fire':
          return 'Player';
        case 'wind':
          return 'Costly Draw';
        case 'water':
          return 'Draw';
      }
    case 'thunder':
      switch (c) {
        case 'earth':
        case 'ice':
          return 'Computer';
        case 'water':
        case 'wind':
          return 'Player';
        case 'fire':
          return 'Costly Draw';
        case 'thunder':
          return 'Draw';
      }
    case 'ice':
      switch (c) {
        case 'wind':
        case 'fire':
          return 'Computer';
        case 'water':
        case 'thunder':
          return 'Player';
        case 'earth':
          return 'Costly Draw';
        case 'ice':
          return 'Draw';
      }
    case 'wind':
      switch (c) {
        case 'thunder':
        case 'fire':
          return 'Computer';
        case 'earth':
        case 'ice':
          return 'Player';
        case 'water':
          return 'Costly Draw';
        case 'wind':
          return 'Draw';
      }
    case 'earth':
      switch (c) {
        case 'wind':
        case 'water':
          return 'Computer';
        case 'thunder':
        case 'fire':
          return 'Player';
        case 'ice':
          return 'Costly Draw';
        case 'earth':
          return 'Draw';
      }
  }
}

function showTurnResult(trnRes, c) {
  switch (trnRes) {
    case 'Player':
      calculateDamage('Player');
      generateModal(trnRes, c);
      break;
    case 'Computer':
      calculateDamage('Computer');
      generateModal(trnRes, c);
      break;
    case 'Costly Draw':
      calculateDamage('Costly Draw');
      generateModal(trnRes, c);
      break;
    case 'Draw':
      generateModal(trnRes, c);
      break;
  }

  modal.style.display = 'block';
}

function calculateDamage(res) {
  switch (res) {
    case 'Player':
      computerHealthBar.value -= 40;
      initialGameData.computerHP -= 40;
      break;
    case 'Computer':
      playerHealthBar.value -= 40;
      initialGameData.playerHP -= 40;
      break;
    case 'Costly Draw':
      computerHealthBar.value -= 20;
      initialGameData.computerHP -= 20;
      playerHealthBar.value -= 20;
      initialGameData.playerHP -= 20;
      break;
  }

  if (initialGameData.playerHP < 0) {
    initialGameData.playerHP = 0;
  } else if (initialGameData.computerHP < 0) {
    initialGameData.computerHP = 0;
  }

  playerHealthPoints.innerHTML = `
    ${initialGameData.playerHP}/100
  `;
  computerHealthPoints.innerHTML = `
    ${initialGameData.computerHP}/100
  `;
}

function generateModal(trnRes, c) {
  modalTurnResult = generateModalResult(trnRes);
  modalIcon = generateModalIcon(c);

  result.innerHTML = `
    <i class='clearModalBtn fas fa-times' id='clearModalBtn'></i>
    <div class='float-reset'></div>
    ${modalTurnResult}
    ${modalIcon}
    <p class='modal-comp-choice'>
      Computer Chose <strong>${c.charAt(0).toUpperCase() + c.slice(1)}</strong>
    </p>
  `;
  
  createClearModalBtnEvent();
}

function generateModalResult(modRes) {
  switch (modRes) {
    case 'Player':
      return `<h1 class='text-effective'>It's super effective!</h1>`;
    case 'Computer':
      return `<h1 class='text-ineffective'>It's not very effective...</h1>`;
    case 'Costly Draw':
      return `<h1 class='text-costly-draw'>A costly draw!</h1>`;
    case 'Draw':
      return `<h1>It's a draw!</h1>`;
  }
}

function generateModalIcon(compChoice) {
  switch (compChoice) {
    case 'fire':
      return `<i class='modal-icon player-choice fas fa-fire-alt fa-7x'></i>`;
    case 'water':
      return `<i class='modal-icon player-choice fas fa-water fa-7x'></i>`;
    case 'thunder':
      return `<i class='modal-icon player-choice fas fa-bolt fa-7x'></i>`;
    case 'ice':
      return `<i class='modal-icon player-choice far fa-snowflake fa-7x'></i>`;
    case 'wind':
      return `<i class='modal-icon player-choice fas fa-wind fa-7x'></i>`;
    case 'earth':
      return `<i class='modal-icon player-choice fas fa-mountain fa-7x'></i>`;
  }
}

function createClearModalBtnEvent() {
  const clearModalBtn = document.getElementById('clearModalBtn');
  clearModalBtn.addEventListener('click', clearModalOnClick);
}

function clearModalOnClick(e) {
  modal.style.display = 'none';
}

function restartGame() {
  initialGameData.playerScore = 0;
  playerHealthBar.value = 100;
  initialGameData.playerHP = 100;
  computerHealthBar.value = 100;
  initialGameData.computerHP = 100;
  
  playerHealthPoints.innerHTML = `
    100/100
  `;
  computerHealthPoints.innerHTML = `
    100/100
  `;
  highscore.innerHTML = `
    <h2 id='highscore' class='highscore'>Score: 0</h2>
  `;

  restartButton.style.display = 'none';
}

function showRoundWinner(c) {
  if (initialGameData.playerHP <= 0 && initialGameData.computerHP <= 0) {
    modalRoundResult = generateModalRoundResult('Draw');
    generateRoundModal(c, modalRoundResult);
    nextRoundStart();
  } else if (initialGameData.computerHP <= 0) {
    initialGameData.playerScore += initialGameData.playerHP;
    modalRoundResult = generateModalRoundResult('Win');
    generateRoundModal(c, modalRoundResult);
    nextRoundStart();
  } else if (initialGameData.playerHP <= 0) {
    modalRoundResult = generateModalRoundResult('Lose');
    generateRoundModal(c, modalRoundResult);
    nextRoundStartLose();
  } 
}

function generateModalRoundResult(rndRes) {
  switch (rndRes) {
    case 'Draw':
      return `<h1>Round resulted in a draw.</h1>`;
    case 'Win':
      return `<h1 class='text-win'>You won the round!</h1>`;
    case 'Lose':
      return `<h1 class='text-lose'>You lost the round.</h1>`;
  }
}

function generateRoundModal(compChoice, mRndRes) {
  modalIcon = generateModalIcon(compChoice);
  rndScore = initialGameData.playerScore;

  result.innerHTML = `
    <i class='clearModalBtn fas fa-times' id='clearModalBtn'></i>
    <div class='float-reset'></div>
    ${mRndRes}
    <p class='modal-score'>Your score: ${rndScore}</p>
    ${modalIcon}
    <p class='modal-comp-choice'>
      Computer Chose <strong>${compChoice.charAt(0).toUpperCase() + compChoice.slice(1)}</strong>
    </p>
  `;

  createClearModalBtnEvent();
}

function nextRoundStart() {
  playerHealthBar.value = 100;
  initialGameData.playerHP = 100;
  computerHealthBar.value = 100;
  initialGameData.computerHP = 100;

  let score = initialGameData.playerScore;

  playerHealthPoints.innerHTML = `
    100/100
  `;
  computerHealthPoints.innerHTML = `
    100/100
  `;
  highscore.innerHTML = `
    <h2 id='highscore' class='highscore'>Score: ${score}</h2>
  `;
}

function nextRoundStartLose() {
  initialGameData.playerScore = 0;
  playerHealthBar.value = 100;
  initialGameData.playerHP = 100;
  computerHealthBar.value = 100;
  initialGameData.computerHP = 100;
  
  playerHealthPoints.innerHTML = `
    100/100
  `;
  computerHealthPoints.innerHTML = `
    100/100
  `;
  highscore.innerHTML = `
    <h2 id='highscore' class='highscore'>Score: 0</h2>
  `;
}

function clearModal(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}
