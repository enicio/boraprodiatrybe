const schedulesTrybe = document.querySelector('#submit');
schedulesTrybe.addEventListener('click', () => {
  const contentText = document.querySelector('#schedulesText').value;
  const arrayOfLinesOnTextArea = contentText.split('\n');

  // console.log(arrayOfLinesOnTextArea)

  const linesByHour = arrayOfLinesOnTextArea.map((line) => {
    // console.log(line);
    // const hour = line.toString().match(/(0[0-9]|1[0-9]|2[0-9])h([0-9])\w+/);
    const hour = line.toString().match(/(0[0-9]|1[0-9]|2[0-9])h([0-9]|([ ]))\w+/);
    if (hour !== null) return hour;
  });


  let arrayHorarios = [];

  linesByHour.forEach((line) => {
    if (typeof line !== 'undefined') {
      arrayHorarios.push(line)
    }
  });
  console.log(arrayHorarios)

  arrayHorarios.forEach((hora) => {
    const initialHourSeparated = hora[0].split('h');
    const finalHourSeparated = initialHourSeparated;
    const arrayRGB = gererateRandomColor();
    const idToGetSchedule = generateId(initialHourSeparated);
    const svg = createSVG(arrayRGB, idToGetSchedule);
    createLI(initialHourSeparated, finalHourSeparated, hora.input, arrayRGB);

    // console.log(initialHourSeparated, 1, svg, arrayRGB)

    createSchedulesOnClock(initialHourSeparated, finalHourSeparated, svg, arrayRGB)
  });
  saveToLocalStorage()
});