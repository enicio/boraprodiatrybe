setInterval(() => {
  setClock();
}, 1000);

setInterval(() => {
  alertToClasse();
}, 10000)

function setClock() {
  const hr = document.querySelector('#hourHand');
  const mn = document.querySelector('#minuteHand');
  const sc = document.querySelector('#secondHand');
  const fieldsOfDate = [...document.querySelector('.date').children]
  const digitalDate = document.querySelector('.digitalClock span');

  let date = new Date();
  let dayOfWeek = date.getDay();
  let actualDay = date.getDate();
  let mouth = date.getMonth() + 1;
  let year = date.getFullYear();

  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  if (Number(fieldsOfDate[1].innerText) !== actualDay) {
    setDateOnClock(fieldsOfDate, dayOfWeek, actualDay, mouth, year);
  }
  setDigitalClock(digitalDate, hh, mm);
  sethandsPositionOnClock(hh, mm, ss, hr, mn, sc);

};

function sethandsPositionOnClock(hh, mm, ss, hr, mn, sc) {
  const min = mm * 6;
  hr.style.transform = `rotateZ(${(hh * 30) + (min / 12)}deg)`;
  mn.style.transform = `rotateZ(${min}deg)`;
  sc.style.transform = `rotateZ(${ss * 6}deg)`;
}

function setDigitalClock(digitalDate, hh, mm) {
  if (hh < 10) hh = '0' + hh;
  if (mm < 10) mm = '0' + mm;
  digitalDate.innerHTML = `${hh}:${mm}`;
}

function setDateOnClock(fieldsOfDate, dayOfWeek, actualDay, mouth, year) {
  fieldsOfDate[0].innerText = `${daysOfWeek[dayOfWeek]}`;
  fieldsOfDate[1].innerText = `${actualDay}`;
  fieldsOfDate[2].innerText = `${mouths[mouth]}`;
  fieldsOfDate[3].innerText = `${year}`;
}
