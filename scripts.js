// Calculator numbers / operators
const clearEverythingBTN = document.getElementById("clear-everything");
const clearBTN = document.getElementById("clear");
const backspaceBTN = document.getElementById("backspace");
const operatorBTN = document.querySelectorAll("[data-operator]");
const numberBTN = document.querySelectorAll("[data-number]");
const equalBTN = document.getElementById("equalButton");
const pointBTN = document.getElementById("pointBTN");

// Calculator screens and history
const historyBTN = document.getElementById("historyIcon");
const currentInput = document.getElementById("currentInput");
const previousInput = document.getElementById("previousInput");
const calculationHistory = [];

let specialOperator = null;
let periodCheck = false;

numberBTN.forEach((button) => button.addEventListener("click", () => updateScreen(button.textContent)));
operatorBTN.forEach((button) => {
    button.addEventListener("click", () => updateOperator(button.textContent));
});
pointBTN.addEventListener("click", addDecimalPoint);
clearEverythingBTN.addEventListener("click", () => clearScreen());
clearBTN.addEventListener("click", () => clearCurrentScreen());
backspaceBTN.addEventListener("click", () => backSpace());
equalBTN.addEventListener("click", updatePreviousInput);
historyBTN.addEventListener("click", showCalculationHistory);

function showCalculationHistory() {
    const historyElement = createHistoryElement();

    // Append the history element to the document body or a specific container
    // You can modify this part based on your project's structure
    document.body.appendChild(historyElement);
}

function createHistoryElement() {
    const historyElement = document.createElement("div");
    historyElement.classList.add("history-element");

    // Add a close button to the history element
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", () => {
        // Remove the history element when the close button is clicked
        historyElement.remove();
    });
    historyElement.appendChild(closeButton);

    // Iterate through the calculation history and create a new <p> element for each calculation
    for (const calculation of calculationHistory) {
        const calculationElement = document.createElement("p");
        calculationElement.textContent = calculation;
        historyElement.appendChild(calculationElement);
    }

    return historyElement;
}
function addDecimalPoint() {
    if (!periodCheck) {
        currentInput.textContent += ".";
        periodCheck = true;
    }
}

function updateScreen(number) {
    if (currentInput.textContent === "") {
        clearCurrentScreen();
    }
    currentInput.textContent += number;
}

let storedNumber = ""; // Variable to store the number before root, power, or reciprocal

function updateOperator(operator) {
    currentNumber = currentInput.textContent.trim();

    if (operator === "%") {
        currentInput.textContent = `${currentNumber} %`;
        calculationHistory.push(previousInput.textContent);
    } else if (operator === "1/x") {
        currentInput.textContent = `1 / (${currentNumber})`;
        calculationHistory.push(previousInput.textContent);
    } else if (operator === "x2") {
        currentInput.textContent = `${currentNumber}^2`;
        calculationHistory.push(previousInput.textContent);
    } else if (operator === "√x") {
        currentInput.textContent = `√${currentNumber}`;
        calculationHistory.push(previousInput.textContent);
    } else if (operator === "+/-") {
        currentInput.textContent = `-${currentNumber}`;
        calculationHistory.push(previousInput.textContent);
    } else {
        // Extract the real number from the operation for power, root, and reciprocal
        storedNumber = getRealNumber(currentNumber);
        currentInput.textContent = `${storedNumber} ${operator} `;
        specialOperator = operator; // Store the special operator
        calculationHistory.push(previousInput.textContent);
    }
}

function getRealNumber(currentNumber) {
    let realNumber = currentNumber;
    if (currentNumber.startsWith("(") && currentNumber.endsWith(")")) {
        realNumber = currentNumber.substring(1, currentNumber.length - 1);
    }
    return realNumber;
}

function updatePreviousInput() {
    const currentInputText = currentInput.textContent.trim();

    // Extract the operand, operator, and currentNumber
    let operand = "";
    let operator = "";
    let currentNumber = "";
    let operatorIndex = -1;

    // Check for special cases first
    if (currentInputText.includes("%")) {
        operator = "%";
        operand = currentInputText.replace("%", "").trim();
    } else if (currentInputText.includes("1 /")) {
        operator = "1/x";
        operand = getRealNumber(currentInputText.replace("1 /", "").trim());
    } else if (currentInputText.includes("^2")) {
        operator = "x2";
        operand = getRealNumber(currentInputText.replace("^2", "").trim());
    } else if (currentInputText.includes("√")) {
        operator = "√x";
        operand = getRealNumber(currentInputText.replace("√", "").trim());
    } else {
        // Find the index of the operator (taking into account negative numbers)
        const operators = ["+", "-", "×", "÷"];
        for (let i = 1; i < currentInputText.length; i++) {
            const currentChar = currentInputText[i];
            if (operators.includes(currentChar)) {
                operatorIndex = i;
                break;
            }
        }

        // Extract the operand and currentNumber based on the operator index
        if (operatorIndex !== -1) {
            operand = currentInputText.slice(0, operatorIndex).trim();
            operator = currentInputText[operatorIndex].trim();
            currentNumber = currentInputText.slice(operatorIndex + 1).trim();
        } else {
            // Handle the case when only one number is present
            operand = currentInputText;
        }
    }

    let result;

    if (operator === "x2" || operator === "√x" || operator === "1/x") {
        result = calculate(operand, operator, "");
    } else {
        result = calculate(operand, operator, currentNumber);
    }

    if (operator === "x2") {
        previousInput.textContent = `(${operand})^2`;
    } else if (operator === "√x") {
        previousInput.textContent = `√(${operand})`;
    } else if (operator === "1/x") {
        previousInput.textContent = `1/(${operand})`;
    } else {
        previousInput.textContent = `${operand} ${operator} ${currentNumber}`;
    }

    currentInput.textContent = `${result}`;
    specialOperator = null; // Reset the special operator
    storedNumber = ""; // Reset the stored number
}

function calculate(operand, operator, currentNumber) {
    let result;

    // Handle the special operators first
    if (operator === "x2") {
        result = power(parseFloat(operand));
    } else if (operator === "√x") {
        if (parseFloat(operand) >= 0) {
            result = root(parseFloat(operand));
        } else {
            return "Error: Invalid input";
        }
    } else if (operator === "1/x") {
        if (parseFloat(operand) !== 0) {
            result = reciprocal(parseFloat(operand));
        } else {
            return "Error: Division by zero";
        }
    } else if (operator === "%") {
        result = percent(parseFloat(operand));
    } else {
        // Perform regular arithmetic operations for add, subtract, multiply, and divide
        const num1 = parseFloat(operand);
        const num2 = parseFloat(currentNumber);

        if (isNaN(num1) || isNaN(num2)) {
            return "Error: Invalid input";
        }

        switch (operator) {
            case "+":
                result = add(num1, num2);
                break;
            case "-":
                result = subtract(num1, num2);
                break;
            case "×":
                result = multiply(num1, num2);
                break;
            case "÷":
                if (num2 !== 0) {
                    result = division(num1, num2);
                } else {
                    return "Error: Division by zero";
                }
                break;
            default:
                return "Error: Invalid operator";
        }
    }

    // Trim the result to a maximum of 11 digits, including the decimal point
    const trimmedResult = result.toFixed(11);

    return parseFloat(trimmedResult).toString();
}

function clearScreen() {
    currentInput.textContent = "";
    previousInput.textContent = "";
    periodCheck = false;
}

function clearCurrentScreen() {
    currentInput.textContent = "";
    periodCheck = false;
}

// Function method to remove the last inputted digit from user input.
function backSpace() {
    currentInput.textContent = currentInput.textContent.toString().slice(0, -1);
}


// Functions for operators.
function percent(num1) {
    return num1 / 100;
}

function reciprocal(num1) {
    return 1 / num1;
}

function power(num1) {
    return Math.pow(num1, 2);
}

function root(num1) {
    if (isNaN(num1)) {
        return "Invalid input";
    }
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
