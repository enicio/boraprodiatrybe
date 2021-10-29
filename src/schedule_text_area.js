const schedulesTrybe = document.querySelector('#submit');
schedulesTrybe.addEventListener('click', () => {
  const contentText = document.querySelector('#schedulesText').value;
  const arrayOfLinesOnTextArea = contentText.split('\n');

  // console.log(arrayOfLinesOnTextArea)

  const linesByHour = arrayOfLinesOnTextArea.map((line) => {
    // console.log(line);
    const re = /[0-2][0-9](h|:)[0-5][0-9]/g
    const hour = [...line.toString().matchAll(re)];
    if (hour.length > 0) return [hour[0][0], hour[1][0], hour[0].input];
  }).filter(el => el);

  linesByHour.forEach((hora) => {
    const initialHourSeparated = hora[0].split(/h|:/);
    const finalHourSeparated = hora[1].split(/h|:/);
    const arrayRGB = gererateRandomColor();
    const idToGetSchedule = generateId(initialHourSeparated);
    const svg = createSVG(arrayRGB, idToGetSchedule);
    createLI(initialHourSeparated, finalHourSeparated, hora[2], arrayRGB);

    // console.log(initialHourSeparated, 1, svg, arrayRGB)

    createSchedulesOnClock(initialHourSeparated, finalHourSeparated, svg, arrayRGB)
  });
  saveToLocalStorage()
});