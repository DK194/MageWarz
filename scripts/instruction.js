const instructionIcons = document.querySelectorAll('.icon-info');
const instructionModal = document.getElementById('instruction-modal');
const iconInfo = document.getElementById('element-info');

instructionIcons.forEach(icon => icon.addEventListener('click', showIconInfo));
window.addEventListener('click', clearModal);

function showIconInfo(e) {
  const playerIcon = e.target.id;
  
  generateIconInfo(playerIcon);
}

function generateIconInfo(pI) {
  let icon = generateIcon(pI);
  let strengths = generateStrengths(pI);
  let weaknesses = generateWeaknesses(pI);
  let normalDmg = generateNormalDmg(pI);

  iconInfo.innerHTML = `
    <i class='clearModalBtn fas fa-times' id='clearModalBtn'></i>
    <div class='float-reset'></div>
    ${icon}
    <p>${pI.charAt(0).toUpperCase() + pI.slice(1)}</p>
    <p>Strong against:</p>
    <div class='icons-wrapper'>
      ${strengths}
    </div>
    <p>Weak against:</p>
    <div class='icons-wrapper'>
      ${weaknesses}
    </div>
    <p>Damaged normally by:</p>
      ${normalDmg}
  `; 
  
  instructionModal.style.display = 'block';

  createClearModalBtnEvent();
}

function generateIcon(playerIcon) {
  switch (playerIcon) {
    case 'fire':
      return `<i id='fire' class='main-icon fas fa-fire-alt fa-4x'></i>`;
    case 'water':
      return `<i id='water' class='main-icon fas fa-water fa-4x'></i>`;
    case 'thunder':
      return `<i id='thunder' class='main-icon fas fa-bolt fa-4x'></i>`;
    case 'ice':
      return `<i id='ice' class='main-icon far fa-snowflake fa-4x'></i>`;
    case 'wind':
      return `<i id='wind' class='main-icon fas fa-wind fa-4x'></i>`;
    case 'earth':
      return `<i id='earth' class='main-icon fas fa-mountain fa-4x'></i>`;
  }
}

function generateStrengths(iconStrengths) {
  switch (iconStrengths) {
    case 'fire':
      return `
        <i id='ice' class='icon-info far fa-snowflake fa-3x'></i>
        <i id='wind' class='icon-info fas fa-wind fa-3x'></i>
      `;
    case 'water':
      return `
        <i id='fire' class='icon-info fas fa-fire-alt fa-3x'></i>
        <i id='earth' class='icon-info fas fa-mountain fa-3x'></i>
      `;
    case 'thunder':
      return `
        <i id='water' class='icon-info fas fa-water fa-3x'></i>
        <i id='wind' class='icon-info fas fa-wind fa-3x'></i>
      `;
    case 'ice':
      return `
        <i id='water' class='icon-info fas fa-water fa-3x'></i>
        <i id='thunder' class='icon-info fas fa-bolt fa-3x'></i>
      `;
    case 'wind':
      return `
        <i id='earth' class='icon-info fas fa-mountain fa-3x'></i>
        <i id='ice' class='icon-info far fa-snowflake fa-3x'></i>
      `;
    case 'earth':
      return `
        <i id='thunder' class='icon-info fas fa-bolt fa-3x'></i>
        <i id='fire' class='icon-info fas fa-fire-alt fa-3x'></i>
      `;
  }
}

function generateWeaknesses(iconWeaknesses) {
  switch (iconWeaknesses) {
    case 'fire':
      return `
        <i id='water' class='icon-info fas fa-water fa-3x'></i>
        <i id='earth' class='icon-info fas fa-mountain fa-3x'></i>
      `;
    case 'water':
      return `
        <i id='ice' class='icon-info far fa-snowflake fa-3x'></i>
        <i id='thunder' class='icon-info fas fa-bolt fa-3x'></i>
      `;
    case 'thunder':
      return `
        <i id='ice' class='icon-info far fa-snowflake fa-3x'></i>
        <i id='earth' class='icon-info fas fa-mountain fa-3x'></i>
      `;
    case 'ice':
      return `
        <i id='wind' class='icon-info fas fa-wind fa-3x'></i>
        <i id='fire' class='icon-info fas fa-fire-alt fa-3x'></i>
      `;
    case 'wind':
      return `
        <i id='thunder' class='icon-info fas fa-bolt fa-3x'></i>
        <i id='fire' class='icon-info fas fa-fire-alt fa-3x'></i>
      `;
    case 'earth':
      return `
        <i id='water' class='icon-info fas fa-water fa-3x'></i>
        <i id='wind' class='icon-info fas fa-wind fa-3x'></i>
      `;
  }
}

function generateNormalDmg(iconNormalDmg) {
  switch (iconNormalDmg) {
    case 'fire':
      return `
        <i id='thunder' class='icon-info fas fa-bolt fa-3x'></i>
      `;
    case 'water':
      return `
        <i id='wind' class='icon-info fas fa-wind fa-3x'></i>
      `;
    case 'thunder':
      return `
        <i id='fire' class='icon-info fas fa-fire-alt fa-3x'></i>
      `;
    case 'ice':
      return `
        <i id='earth' class='icon-info fas fa-mountain fa-3x'></i>
      `;
    case 'wind':
      return `
        <i id='water' class='icon-info fas fa-water fa-3x'></i>
      `;
    case 'earth':
      return `
        <i id='ice' class='icon-info far fa-snowflake fa-3x'></i>
      `;
  }
}

function createClearModalBtnEvent() {
  const clearModalBtn = document.getElementById('clearModalBtn');
  clearModalBtn.addEventListener('click', clearModalOnClick);
}

function clearModalOnClick() {
  instructionModal.style.display = 'none';
}

function clearModal(e) {
  if (e.target === instructionModal) {
    instructionModal.style.display = 'none';
  }
}
