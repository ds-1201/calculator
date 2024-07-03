const result = document.getElementById("result");
function appendNumber(number) {
  result.value += number;
}

function appendOperator(operator) {
  if (operator === "*") {
    result.value += " x ";
  } else {
    result.value += " " + operator + " ";
  }
}

function deleteLast() {
  if (result.value === "") {
    return;
  }
  if (result.value.includes("Error") || result.value.includes("Infinity")) {
    return (result.value = "");
  }
  if (result.value.slice(-1) === " ") {
    result.value = result.value.slice(0, -3);
  } else {
    result.value = result.value.slice(0, -1);
  }
}

function resetCalculator() {
  if (result.value === "") {
    return;
  }
  result.value = "";
}

function calculateResult() {
  try {
    if (result.value === "") return;

    // replace x with *
    let expression = result.value.replaceAll("x", "*");

    let ans = eval(expression);

    // if ans is a decimal number
    if (ans > Math.floor(ans)) {
      ans = ans.toFixed(3);
    }

    result.value = ans;
  } catch (error) {
    result.value = "Error";
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "=") {
    calculateResult();
  }
  if (event.key === "Backspace" || event.key === "Delete") {
    deleteLast();
  }
  if (event.key === "Escape") {
    resetCalculator();
  }
  if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    appendOperator(event.key);
  }
  if (event.key >= 0 && event.key <= 9) {
    if (event.key === " ") return;
    appendNumber(event.key);
  }
  if (event.key === ".") {
    appendNumber(".");
  }
});
