let dateElement = document.getElementById("date");
const date = new Date();
let currentDay = String(date.getDate()).padStart(2, "0");
let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
let currentYear = date.getFullYear();
console.log(`${currentDay}  ${currentMonth} ${currentYear}`);

// event listen for button
document.getElementById("submit").addEventListener("click", submit);


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
    if(checkEmptyInputs(day, month, year)) {

    } else {

    }

    // add 0 to day or month if below 10
    if (day < 10) {
        day = `0${day}`;
    }

    if (month < 10) {
        month = `0${month}`;
    }

    days.innerHTML = day;
    months.innerHTML = month;
    console.log(leapyear(year));
}

// function to check if given year is a leap year
function leapyear(year)
{
return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

// function to check whether or not the data entered is valid
function checkValidInput(day, month, year) {
    const daysInMonth = {
      January: 31,
      February: leapyear(year) ? 29 : 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31
    };
  
    if (month in daysInMonth) {
      const maxDays = daysInMonth[month];
      return day >= 1 && day <= maxDays;
    }
  
    return false; // Invalid month
  }

// function to check if given inputs are empty and display relevant error messages inputs are empty
function checkEmptyInputs(day, month, year) {

    let toReturn = true;
  
    if (day === "") {
      let dayError = document.getElementById("dayError");
      dayError.innerHTML = "Cannot be Empty!";
      dayError.style.display = "block";
      toReturn = false;
    }
  
    if (month === "") {
        let monthError = document.getElementById("monthError");
        monthError.innerHTML = "Cannot be Empty!"
        monthError.style.display = "block";
        toReturn = false;

    }
  
    if (year === "") {
        let yearError = document.getElementById("yearError");
        yearError.innerHTML = "Cannot be Empty!"
        yearError.style.display = "block";
        toReturn = false

    }
  
    return toReturn;
  }

  // function to clear error messages element is not empty
  function clearError(day, month, year) {

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