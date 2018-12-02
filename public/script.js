const cardContainer = document.querySelector('.card-container');
const shuffleButton = document.querySelector('.shuffle');
const projectHeader = document.querySelector('.project-name');
const paletteHeader = document.querySelector('.palette-name');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const saveButton = document.querySelector('.save-btn');
const newButton = document.querySelector('.new-btn');

cardContainer.addEventListener('click', toggleLock);
shuffleButton.addEventListener('click', setColors);
projectHeader.addEventListener('keyup', blurOnEnter);
projectHeader.addEventListener('blur', updateProjectName);
saveButton.addEventListener('click', savePalette); newButton.addEventListener('click', newPalette);
prevButton.addEventListener('click', () => cyclePalette(-1));
nextButton.addEventListener('click', () => cyclePalette(1));

let paletteIds = [];
const palette = {
  id: null,
};

const project = {
  name: '',
  id: null,
};

function newPalette() {
  paletteHeader.value = '';
  palette.id = null;
  setColors();
}

async function savePalette() {
  const hexVals = {};
  const colors = document.querySelectorAll('.color');
  colors.forEach((color, i) => (hexVals[`hex${i + 1}`] = color.innerText));
  if (!project.id) {
    const res = await fetch('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify({name: project.name}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newId = await res.json();
    project.id = newId;
    loadProjects();
  }
  const res = await fetch(`/api/v1/projects/${project.id}/palettes`, {
    method: 'POST',
    body: JSON.stringify({name:paletteHeader.value, ...hexVals}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const pal = await res.json();
  await setProject(project.id);
  setPalette(pal.id);
}

function cyclePalette(num) {
  if (!palette.id || !paletteIds.length) {
    return;
  }
  let newId;
  const currentPalette = paletteIds.indexOf(palette.id);
  if (paletteIds[currentPalette + num]) {
    newId = paletteIds[currentPalette + num];
  } else if (num === 1) {
    newId = paletteIds[0];
  } else if (num === -1) {
    newId = paletteIds[paletteIds.length - 1];
  }
  setPalette(newId);
}

function generateColors(num) {
  let colors = [];
  const randomHex = () => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    return hex[Math.floor(Math.random() * 16)];
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
}

function setColors() {
  const unlockedCards = document.querySelectorAll('.fa-lock-open');
  const colors = generateColors(unlockedCards.length);
  unlockedCards.forEach((card, i) => {
    card.style.borderColor = colors[i];
    card.innerText = colors[i];
    card.parentElement.style.backgroundColor = colors[i];
  });
}

async function loadProjects() {
  const dropdown = document.querySelector('.dropdown');
  const res = await fetch('api/v1/projects');
  const projects = await res.json();
  const projectLi = projects.map(
    project =>
      `<li class="alternate-title" id='${project.id}'>${project.name}</li>`,
  );
  dropdown.innerHTML = '';
  dropdown.innerHTML = projectLi.join('');
  const projectNames = document.querySelectorAll('.alternate-title');
  projectNames.forEach(name => name.addEventListener('click', selectProject));
}

function selectProject(e) {
  project.name = e.target.innerText;
  project.id = e.target.id;
  projectHeader.value = project.name;
  setProject();
}

async function setProject() {
  const res = await fetch(`api/v1/projects/${project.id}/palettes`);
  const palettes = await res.json();
  const colorCards = document.querySelectorAll('.color');
  paletteIds = palettes.map(palette => palette.id);
  if (palettes.length === 0) {
    setColors();
    return;
  }
  palette.id = paletteIds[0];
  setPalette(palette.id);
  console.log(paletteIds[0]);
}

async function setPalette(id) {
  palette.id = id;
  const res = await fetch(
    `api/v1/projects/${project.id}/palettes/${palette.id}`,
  );
  const colors = await res.json();
  paletteHeader.value = colors.name;
  const colorCards = document.querySelectorAll('.color');
  colorCards.forEach((card, i) => {
    card.style.borderColor = colors[`hex${i + 1}`];
    card.innerText = colors[`hex${i + 1}`].toUpperCase();
    card.parentElement.style.backgroundColor = colors[`hex${i + 1}`];
  });
}

async function updateProjectName(e) {
  if (!project.id) {
    return;
  }
  project.name = e.target.value;
  if (project.id) {
    await fetch(`/api/v1/projects/${project.id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    await fetch('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify({name: project.name}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  loadProjects();
}

function toggleLock(e) {
  if (e.target.classList.contains('fa-lock-open')) {
    e.target.classList.remove('fa-lock-open');
    e.target.classList.add('fa-lock');
  } else if (e.target.classList.contains('fa-lock')) {
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
}

setColors();
loadProjects();
