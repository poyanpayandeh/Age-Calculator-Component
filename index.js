let dateElement = document.getElementById("date");
const date = new Date();
let currentDay = String(date.getDate()).padStart(2, "0");
let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
let currentYear = date.getFullYear();
console.log(`${currentDay} ${currentMonth} ${currentYear}`);

// event listen for button
document.getElementById("submit").addEventListener("click", submit);

// function to only allow digits to be entered into text input
function isInputNumber(e) {
  let ch = String.fromCharCode(e.which);
  if (!/[0-9]/.test(ch)) {
    e.preventDefault();
  }
}

function submit() {
  // get elements to be shown
  let days = document.getElementById("days");
  let months = document.getElementById("months");
  let yesrs = document.getElementById("years");
  // get submitted inputs
  let day = document.getElementById("dayInput").value;
  let month = document.getElementById("monthInput").value;
  let year = document.getElementById("yearInput").value;

  clearError(day, month, year);
  if (checkEmptyInputs(day, month, year)) {
    // add 0 to day or month if below 10
    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    if (checkValidInput(day, month, year)) {
      calculateAge(day, month, year);
    }
  }
}

// function to check if given year is a leap year
function leapyear(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

// function to check whether or not the data entered is valid
function checkValidInput(day, month, year) {
  let yearError = document.getElementById("yearError");
  let monthError = document.getElementById("monthError");
  let dayError = document.getElementById("dayError");
  let dayLabel = document.getElementById("day");
  let monthLabel = document.getElementById("month");
  let yearLabel = document.getElementById("year");

  const daysInMonth = {
    1: 31, // January
    2: leapyear(year) ? 29 : 28, // February
    3: 31, // March
    4: 30, // April
    5: 31, // May
    6: 30, // June
    7: 31, // July
    8: 31, // August
    9: 30, // September
    10: 31, // October
    11: 30, // November
    12: 31, // December
  };

  let isDayValid = false;
  let isMonthValid = false;
  let isYearValid = false;

  const parsedDay = parseInt(day, 10); // Convert day to a number
  const parsedMonth = parseInt(month, 10); // Convert month to a number
  const parsedYear = parseInt(year, 10); // Convert year to a number

  if (parsedMonth >= 1 && parsedMonth <= 12) {
    const maxDays = daysInMonth[parsedMonth];
    if (parsedDay >= 1 && parsedDay <= maxDays) {
      // Valid day
      isDayValid = true;
    } else {
      // Invalid day
      dayError.innerHTML = "Day must be valid!";
      dayLabel.style.color = "var(--LightRed)";
      dayInput.style.border = "1px solid var(--LightRed)";
      dayError.style.display = "block";
    }
    // Valid month
    isMonthValid = true;
  } else {
    // Invalid month
    monthError.innerHTML = "Month must be valid!";
    monthInput.style.border = "1px solid var(--LightRed)";
    monthLabel.style.color = "var(--LightRed)";
    monthError.style.display = "block";
  }

  const currentYear = new Date().getFullYear();
  if (parsedYear <= currentYear) {
    // Valid year
    isYearValid = true;
  } else {
    // Invalid year
    yearError.innerHTML = "Year must be valid!";
    yearInput.style.border = "1px solid var(--LightRed)";
    yearLabel.style.color = "var(--LightRed)";
    yearError.style.display = "block";
  }

  if (isDayValid && isMonthValid && isYearValid) {
    // Reset the error messages if all inputs are valid
    dayError.style.display = "none";
    monthError.style.display = "none";
    yearError.style.display = "none";
    return true;
  } else {
    return false;
  }
}

// function to check if given inputs are empty and display relevant error messages inputs are empty
function checkEmptyInputs(day, month, year) {
  let dayInput = document.getElementById("dayInput");
  let monthInput = document.getElementById("monthInput");
  let yearInput = document.getElementById("yearInput");
  let dayLabel = document.getElementById("day");
  let monthLabel = document.getElementById("month");
  let yearLabel = document.getElementById("year");

  let toReturn = true;

  if (day === "") {
    let dayError = document.getElementById("dayError");
    dayInput.style.border = "1px solid var(--LightRed)";
    dayError.innerHTML = "Cannot be Empty!";
    dayError.style.display = "block";
    dayLabel.style.color = "var(--LightRed)";
    toReturn = false;
  }

  if (month === "") {
    let monthError = document.getElementById("monthError");
    monthError.innerHTML = "Cannot be Empty!";
    monthLabel.style.color = "var(--LightRed)";
    monthInput.style.border = "1px solid var(--LightRed)";
    monthError.style.display = "block";
    toReturn = false;
  }

  if (year === "") {
    let yearError = document.getElementById("yearError");
    yearError.innerHTML = "Cannot be Empty!";
    yearLabel.style.color = "var(--LightRed)";
    yearError.style.display = "block";
    yearInput.style.border = "1px solid var(--LightRed)";
    toReturn = false;
  }

  return toReturn;
}

// function to clear error messages element if not empty
function clearError(day, month, year) {
  let dayInput = document.getElementById("dayInput");
  let monthInput = document.getElementById("monthInput");
  let yearInput = document.getElementById("yearInput");
  let dayLabel = document.getElementById("day");
  let monthLabel = document.getElementById("month");
  let yearLabel = document.getElementById("year");

  dayLabel.style.color = "var(--SmokeyGrayy)";
  monthLabel.style.color = "var(--SmokeyGrayy)";
  yearLabel.style.color = "var(--SmokeyGrayy)";

  dayInput.style.border = "1px solid var(--lightGray)";
  monthInput.style.border = "1px solid var(--lightGray)";
  yearInput.style.border = "1px solid var(--lightGray)";

  if (day !== "") {
    let dayError = document.getElementById("dayError");
    dayError.style.display = "none";
  }

  if (month !== "") {
    let monthError = document.getElementById("monthError");
    monthError.style.display = "none";
  }

  if (year !== "") {
    let yearError = document.getElementById("yearError");
    yearError.style.display = "none";
  }
}

// calculate age and put into element
function calculateAge(birthDay, birthMonth, birthYear) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Months are zero-based (0-11)
  const currentDay = today.getDate();

  let ageYears = currentYear - birthYear;
  let ageMonths = currentMonth - birthMonth;
  let ageDays = currentDay - birthDay;

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    ageYears--;
    if (currentMonth < birthMonth) {
      ageMonths = 12 - birthMonth + currentMonth;
    } else {
      ageMonths = 0;
    }

    const daysInPreviousMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();
    ageDays = daysInPreviousMonth - birthDay + currentDay;
    if (ageDays < 0) {
      ageMonths--;
      const previousMonthDays = new Date(
        currentYear,
        currentMonth - 2,
        0
      ).getDate();
      ageDays += previousMonthDays;
    }
  } else if (currentDay < birthDay) {
    const daysInPreviousMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();
    ageMonths--;
    ageDays = daysInPreviousMonth - birthDay + currentDay;
  }

  // Adjust for leap year
  if (
    birthMonth === 2 &&
    birthDay === 29 &&
    !leapyear(birthYear) &&
    ageYears > 0
  ) {
    ageYears--;
    ageMonths = 11;
    ageDays = new Date(currentYear, currentMonth - 1, 0).getDate();
  }

  // Update HTML elements
  let daysElement = document.getElementById("days");
  let monthsElement = document.getElementById("months");
  let yearsElement = document.getElementById("years");

  daysElement.innerHTML = ageDays;
  monthsElement.innerHTML = ageMonths;
  yearsElement.innerHTML = ageYears;
}
