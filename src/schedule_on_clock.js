function log(ops) {
  console.log(ops);
}

function saveToLocalStorage() {
  const svgs = document.querySelector('.svgonclock');
  const lists = document.querySelector('.list');
  const schedulesList = lists.innerHTML;
  const scheduleSVG = svgs.innerHTML;
  localStorage.setItem('svgsTrybe', JSON.stringify(scheduleSVG));
  localStorage.setItem('listTrybe', JSON.stringify(schedulesList));
};

function toEraseOneItem(e) {

  if (e.target.classList.contains('close')) {
    const classToErase = e.target.parentElement.classList[0];
    const elementsToErase = document.querySelectorAll(`.${classToErase}`);
    elementsToErase.forEach((element) => {
      element.remove();
    });
    saveToLocalStorage()
  }
};

function recoverSchedulesOnLocalStorage() {
  const listOnLocalStorage = JSON.parse(localStorage.getItem('listTrybe'));
  const listOPS = document.querySelector('.list');
  const listRec = listOnLocalStorage;
  listOPS.innerHTML = listRec;

  const svgOnLocalStotage = JSON.parse(localStorage.getItem('svgsTrybe'));
  const svgonclock = document.querySelector('.svgonclock');
  const svRec = svgOnLocalStotage;
  svgonclock.innerHTML = svRec;
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gererateRandomColor() {
  const array = [];
  array[0] = getRandomIntInclusive(0, 255);
  array[1] = getRandomIntInclusive(0, 255);
  array[2] = getRandomIntInclusive(0, 255);
  return array;
};

function createSVG(arrayRGB, idToGetSchedule) {
  return `<svg viewBox="0 0 36 36" class="circular-chart toER${arrayRGB[0]}${arrayRGB[1]}" id=A${idToGetSchedule}>
          <path class="circle" d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>`;
}

function createSchedulesOnClock(initialHourSeparated, finalHourSeparated, svg, arrayRGB) {
  const initialHourToMinutes = (Number(initialHourSeparated[0]) * 60) + Number(initialHourSeparated[1]);
  const finalHourToMinutes = (Number(finalHourSeparated[0]) * 60) + Number(finalHourSeparated[1]);
  const durationOfSchedule = Math.abs((Number(finalHourToMinutes) - Number(initialHourToMinutes)) * 0.166);
  let degreeToRotate = (30 * Number(initialHourSeparated[0])) + Number(initialHourSeparated[1]) / 2;
  const svgonclock = document.querySelector('.svgonclock');
  svgonclock.innerHTML += svg;

  // if (degreeToRotate > 360) degreeToRotate = degreeToRotate - 360;

  console.log(finalHourToMinutes)

  svgonclock.lastElementChild.style.transform = `rotate(${degreeToRotate}deg)`;
  svgonclock.lastElementChild.style.strokeDasharray = `${durationOfSchedule} , 100`;
  svgonclock.lastElementChild.lastElementChild.style.stroke = `rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]},0.40)`

}

function generateId(initialHourSeparated) {
  let degreeToRotate = (30 * Number(initialHourSeparated[0])) + Number(initialHourSeparated[1]) / 2;
  return idToGetSchedule = degreeToRotate * 10;
}

function cleanFields() {
  document.querySelector('#schedule').value = '';
  document.querySelector('#initialHour').value = '';
  document.querySelector('#finalHour').value = '';
}

function createLI(initialHourSeparated, finalHourSeparated, schedule, arrayRGB) {

  const ops = parseInt(initialHourSeparated[1]);
  if (isNaN(ops)) {
    initialHourSeparated[1] = '00';
  };

  // if (initialHourSeparated[0] > 12) degreeToRotate -= 360;
  const idToGetSchedule = generateId(initialHourSeparated);

  const ol = document.querySelector('.list');
  const li = document.createElement('LI');
  const scheduleOnLi = document.createElement('span');
  const task = document.createElement('span');
  // const img = document.createElement('IMG')
  const deleteIcon = document.createElement('span');

  scheduleOnLi.innerHTML = `${initialHourSeparated[0]}:${initialHourSeparated[1]} ate
                            ${finalHourSeparated[0]}:${finalHourSeparated[1]}`;
  scheduleOnLi.style.background = `rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]},0.60)`;;
  scheduleOnLi.setAttribute('class', 'schedule');
  li.appendChild(scheduleOnLi);


  task.innerHTML = `${schedule}`;
  task.setAttribute('class', 'task')
  li.appendChild(task);

  deleteIcon.setAttribute('class', 'erase close')
  li.appendChild(deleteIcon);

  li.style.background = `rgb(245, 245, 245)`;
  li.setAttribute('class', `toER${arrayRGB[0]}${arrayRGB[1]}`);
  li.setAttribute('style', `box-shadow: 0px 2px 0px rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]},0.60)`);
  li.setAttribute('id', `A${idToGetSchedule}`);
  ol.appendChild(li);

  cleanFields();
};

function createSchedules() {
  const schedule = document.querySelector('#schedule').value;
  const initialHour = document.querySelector('#initialHour').value;
  const finalHour = document.querySelector('#finalHour').value;

  if (schedule === '' || initialHour === '' || finalHour === '') {
    alert('Não pode haver campos em branco.')
  } else {
    const initialHourSeparated = initialHour.split(':')
    const finalHourSeparated = finalHour.split(':')
    const arrayRGB = gererateRandomColor();
    const idToGetSchedule = generateId(initialHourSeparated);
    const svg = createSVG(arrayRGB, idToGetSchedule);

    createLI(initialHourSeparated, finalHourSeparated, schedule, arrayRGB)
    createSchedulesOnClock(initialHourSeparated, finalHourSeparated, svg, arrayRGB)

    saveToLocalStorage()
  }
};

function getSchedulesSVG() {
  let arrayOfAngles = [];
  const svgTag = document.querySelectorAll('.circular-chart');
  svgTag.forEach((svg) => {
    const rotateZ = svg.style.transform;
    const angleOnSvg = rotateZ.match(/([0-9])?([0-9][0-9])(\.([0-9]))?/);
    arrayOfAngles.push(angleOnSvg[0])
    // console.log(angleOnSvg[0]);
  });
  //console.log(arrayOfAngles);
  return arrayOfAngles;
};

function getAngleOfHour() {
  const actualAngleOfPointer = document.querySelector('#hourHand').style.transform;
  // console.log(actualAngleOfPointer)
  const angle = actualAngleOfPointer.match(/([0-9])?([0-9][0-9])(\.([0-9]))?/);
  // console.log(angle[0])
  return angle[0];
};

function alertToClasse() {
  const hourAngle = getAngleOfHour();
  const arrayOfSchedules = getSchedulesSVG();
  console.log(hourAngle)
  console.log(arrayOfSchedules)

  const haveSchedule = arrayOfSchedules.find((schedule) => schedule === hourAngle);
  console.log(haveSchedule);
  if (haveSchedule) {
    const toUseOnQuery = haveSchedule * 10;
    console.log(toUseOnQuery)

    const messageToNofification = document.querySelectorAll(`#A${toUseOnQuery}`)[0].innerText;

    let notification = new Notification(messageToNofification);
  }
};

function notifyMe() {
  // Verifica se o browser suporta notificações
  if (!("Notification" in window)) {
    alert("Este browser não suporta notificações de Desktop");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Kombi");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Obrigado!!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}



document.addEventListener('click', toEraseOneItem);

const buttonCreateSchedule = document.querySelector('#createSchedule');
buttonCreateSchedule.addEventListener('click', createSchedules);

window.onload = function () {
  setClock()
  recoverSchedulesOnLocalStorage();
  alertToClasse();
  notifyMe();
};
