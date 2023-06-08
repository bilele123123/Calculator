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

numberBTN.forEach(button => {
    button.addEventListener("click", () => {
        const number = button.dataset.number;
        currentInput.textContent += number;
    })
})

operatorBTN.forEach(button => {
    button.addEventListener("click", () => updateOperator(button.textContent))
})

function updateOperator(operator) {
    currentNumber = currentInput.textContent;
    if (operator.includes("/x"))
    {
        previousInput.textContent = `1/(${currentNumber})`;
    }
    else if (operator.includes("x") && operator.includes("2"))
    {
        previousInput.textContent = `(${currentNumber}^2)`;
    }
    else if (operator === "√x")
    {
        previousInput.textContent = `√(${currentNumber})`;
    }
    else
    {
        previousInput.textContent = `${currentNumber} ${operator}`;
    }
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