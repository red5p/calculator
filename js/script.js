let firstOperand = "";
let lastOperand = "";
let operator = "";
let currentResult = 0;

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
const equalsButton = document.querySelector("#equals");
const allClearButton = document.querySelector("#allClear");

numberButtons.forEach(button => {
    button.onclick = (e) => {
        updateOperand(e);
    }
});
operatorButtons.forEach(button => {
    button.onclick = (e) => {
        updateOperator(e);
    }
});
equalsButton.onclick = () => {
    evaluate();
};
allClearButton.onclick = () => {
    clear();
};


function updateOperand(e) {
    if (operator === "") {
        if (firstOperand === "0") {
            firstOperand = e.target.textContent;
        } else {
            firstOperand += e.target.textContent;
        }
    } else if (operator !== "") {
        if (lastOperand === "0") {
            lastOperand = e.target.textContent;
        } else {
            lastOperand += e.target.textContent;
        }
    }
    updateDisplay(); 
}

function updateOperator(e) {
    // should not enter operator when there's no first operand
    if (firstOperand === "") {
        return;
    }

    if (lastOperand === "") {
        operator = e.target.textContent;
    } else if (lastOperand !== "") {
        if (lastOperand === "0") {
            alertDivisionByZero();
            return;
        }
        operate(+firstOperand, +lastOperand, operator);
        firstOperand = currentResult;
        lastOperand = "";
        operator = e.target.textContent;
    }
    updateDisplay();
}

function alertDivisionByZero() {
    alert("Oops. You cannot divide by zero :T");
    clear();
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            currentResult = add(a, b);
            break;
        case "-":
            currentResult = subtract(a, b);
            break;
        case "x":
            currentResult = multiply(a, b);
            break;
        case "/":
            currentResult = divide(a, b);
    }
    currentResult = Math.round(currentResult * 1000) / 1000;
}

function updateDisplay() {
    input.textContent = firstOperand + operator + lastOperand;
    result.textContent = currentResult;
}

function clear() {
    firstOperand = "";
    lastOperand = "";
    operator = "";
    currentResult = 0;
    updateDisplay();
}

function evaluate() {
    if (lastOperand === "0") {
        alertDivisionByZero();
        return;
    }

    if (firstOperand === "" || operator === "" || lastOperand ==="") {
        return;
    }
    
    operate(+firstOperand, +lastOperand, operator);
    firstOperand = currentResult;
    lastOperand = "";
    operator = "";

    updateDisplay();
}