const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;

//xoá dấu +,- khi nhập số vào input tag có id là budget
function cleanInputString(str) {
  const regex = /[+-\s]/g; //escape + để nó chỉ là dấu + bình thường => regex này match với chuỗi "+-"
  //g là 1 flag - viết tắt của global
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i; //i flag, i là viết tắt của insensitive
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber = targetInputContainer.querySelectorAll();
}
