import { constants } from './constants.js';

// dark mode toggle
const toggle = document.querySelector('.dark-mode-switch');
toggle.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('dark');
  document.querySelector('body').classList.toggle('light');
});

// check leap year
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 === 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

// get febrary days
const febraryDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

const calendar = document.querySelector('.calendar');
const monthPiker = document.querySelector('#month-picker');
const monthList = calendar.querySelector('.month-list');

monthPiker.addEventListener('click', () => {
  monthList.classList.add('show');
});

// generate calendar
const generateCalendar = (year, month) => {
  const calendarDays = calendar.querySelector('.calendar-days');
  const calendarHeaderYear = calendar.querySelector('#year');

  const daysOfMonth = [
    31,
    febraryDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  calendarDays.innerHTML = '';

  const currentDate = new Date();

  monthPiker.innerHTML = constants.months[month];
  calendarHeaderYear.innerHTML = year;

  const firstDay = new Date(year, month, 1);

  for (let i = 0; i < daysOfMonth[month] + firstDay.getDay(); i++) {
    const day = document.createElement('div');
    if (i >= firstDay.getDay()) {
      day.classList.add('calendar-day-hover');
      day.innerHTML = i - firstDay.getDay() + 1;
      day.innerHTML += `<span></span>
                        <span></span>
                        <span></span>
                        <span></span>`;
      if (
        i - firstDay.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('curr-date');
      }
    }
    calendarDays.appendChild(day);
  }
};

const currDate = new Date();
let currentYear = { value: currDate.getFullYear() };
let currentMonth = { value: currDate.getMonth() };

constants.months.forEach((mth, index) => {
  const month = document.createElement('div');
  month.innerHTML = `<div>${mth}</div>`;
  month.addEventListener('click', () => {
    monthList.classList.remove('show');
    currentMonth.value = index;
    generateCalendar(currentYear.value, currentMonth.value);

    console.log(currentMonth.value);
    console.log({ mth, index });
  });
  monthList.appendChild(month);
});

document.querySelector('#prev-year').addEventListener('click', () => {
  currentYear.value--;
  generateCalendar(currentYear.value, currentMonth.value);
});

document.querySelector('#next-year').addEventListener('click', () => {
  currentYear.value++;
  generateCalendar(currentYear.value, currentMonth.value);
});

generateCalendar(currentYear.value, currentMonth.value);
