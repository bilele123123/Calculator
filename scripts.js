//Calculator numbers / operators
const clearEverythingBTN = document.getElementById("clear-everything");
const clearBTN = document.getElementById("clear");
const backspaceBTN = document.getElementById("backspace");
const operatorBTN = document.querySelectorAll("[data-operator]");
const numberBTN = document.querySelectorAll("[data-number]");
const equalBTN = document.getElementById("equalButton");
const pointBTN = document.getElementById("pointBTN");

//Calculator screens and history
const historyBTN = document.getElementById("historyIcon");
const currentInput = document.getElementById("currentInput");
const previousInput = document.getElementById("previousInput");

numberBTN.forEach((button) =>
  button.addEventListener('click', () => updateScreen(button.textContent))
)

operatorBTN.forEach(button => {
    button.addEventListener("click", () => updateOperator(button.textContent))
})

clearEverythingBTN.addEventListener("click", () => clearScreen());
clearBTN.addEventListener("click", () => clearCurrentScreen());
backspaceBTN.addEventListener("click", () => backSpace());

equalBTN.addEventListener("click", updatePreviousInput)

function updateScreen(number) {
    if (currentInput.textContent === "")
    {
        clearScreen();
    }
    currentInput.textContent += number;
}

function updateOperator(operator) {
    currentNumber = currentInput.textContent;
    if (operator.includes("/x")) {
        currentInput.textContent = `1/(${currentNumber})`;
    }
    else if (operator.includes("x") && operator.includes("2")) {
        currentInput.textContent = `(${currentNumber}^2) `;
    }
    else if (operator === "√x") {
        currentInput.textContent = `√(${currentNumber}) `;
    }
    else if (operator === "+/-") {
        currentInput.textContent = `-${currentNumber}`;
    }
    else {
        currentInput.textContent = `${currentNumber} ${operator} `;
    }
}

function updatePreviousInput() {
    const currentInputText = currentInput.textContent.trim();
    const operatorIndex = currentInputText.search(/[\+\-\×\÷]/);
    const operand = currentInputText.slice(0, operatorIndex).trim();
    const operator = currentInputText[operatorIndex].trim();
    const currentNumber = parseFloat(currentInputText.slice(operatorIndex + 1).trim());
  
    const result = calculate(operand, operator, currentNumber);
  
    previousInput.textContent = `${operand} ${operator} ${currentNumber}`;
    currentInput.textContent = `${result}`;
  }
  
function calculate(operand, operator, currentNumber) {
    let result;
    switch (operator) {
      case "+":
        result = add(parseFloat(operand), currentNumber);
        break;
      case "-":
        result = subtract(parseFloat(operand), currentNumber);
        break;
      case "×":
        result = multiply(parseFloat(operand), currentNumber);
        break;
      case "÷":
        result = division(parseFloat(operand), currentNumber);
        break;
      default:
        break;
    }
    return result;
  }

function clearScreen() {
    currentInput.textContent = "";
    previousInput.textContent = "";
}

function clearCurrentScreen() {
    currentInput.textContent = " ";
}

function backSpace() {
    currentInput.textContent = currentInput.textContent.toString().slice(0, -1);
}

function percent(num1) {
    return num1 / 100;
}

function reciprocal(num1) {
    return 1 / num1;
}

function power(num1) {
    return num1 * num1;
}

function root(num1) {
    return Math.sqrt(num1);
}

function division(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function add(num1, num2) {
    return num1 + num2;
}