const cardContainer = document.querySelector('.card-container');
const shuffleButton = document.querySelector('.shuffle');
const projectHeader = document.querySelector('.project-name');

cardContainer.addEventListener('click', toggleLock);
shuffleButton.addEventListener('click', setColors);
projectHeader.addEventListener('keyup', blurOnEnter);

const project = {
  name: '',
  id: null
}

function generateColors(num) {
  let colors = [];
  const randomHex = () => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']; return hex[Math.floor(Math.random() * 16)];
  };
  const randomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += randomHex();
    }
    return color;
  };

  for (let i = 0; i < num; i++) {
    colors.push(randomColor());
  }
  return colors;
};

function setColors() {
  const unlockedCards = document.querySelectorAll('.fa-lock-open');
  const colors = generateColors(unlockedCards.length);
  unlockedCards.forEach((card, i) => {
    card.style.borderColor = colors[i];
    card.innerText = colors[i];
    card.parentElement.style.backgroundColor = colors[i];
  });
};

function toggleLock(e) {
  if (e.target.classList.contains('fa-lock-open')) {
    e.target.classList.remove('fa-lock-open');
    e.target.classList.add('fa-lock');
  }
  else if (e.target.classList.contains('fa-lock')) {
    e.target.classList.remove('fa-lock');
    e.target.classList.add('fa-lock-open');
  }
}

function blurOnEnter(e) {
  project.name = e.target.value;
  const key = e.keyCode || e.charCode;
  if (key === 13) {
    projectHeader.blur();
  }
  console.log(project.name);
}

setColors();
