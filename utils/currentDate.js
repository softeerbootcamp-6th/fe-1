const currentDate = new Date();

const MonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getCurrentMonth() {
  return currentDate.getMonth() + 1;
}

export function getCurrentMonthName() {
  return MonthNames[currentDate.getMonth()];
}

export function getCurrentYear() {
  return currentDate.getFullYear();
}

export function getCurrentDay() {
  return currentDate.getDate();
}
