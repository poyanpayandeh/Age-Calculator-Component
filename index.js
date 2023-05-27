let dateElement = document.getElementById("date");
const date = new Date();
let currentDay = String(date.getDate()).padStart(2, "0");
let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
let currentYear = date.getFullYear();
console.log(date);

document.getElementById("submit").addEventListener("click", submit);

function submit() {
    console.log("submit");
}
