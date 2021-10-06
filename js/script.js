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
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function updateEquation(e) {
    const targetClassList = Array.from(e.target.classList);
    if (targetClassList.includes("number")) {
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
    } else if (targetClassList.includes("operator")) {
        if (lastOperand === "") {
            operator = e.target.textContent;
        } else if (lastOperand !== "") {
            currentResult = operate(+firstOperand, +lastOperand, operator);
            firstOperand = currentResult;
            lastOperand = "";
            operator = e.target.textContent;
        }
    }
    currentInput = firstOperand + operator + lastOperand;
    updateDisplay();
}

function updateDisplay() {
    input.textContent = currentInput;
    result.textContent = currentResult;
}

function clear() {
    firstOperand = "";
    lastOperand = "";
    operator = "";
    currentInput = "";
    currentResult = 0;
}

function evaluate() {
    if (firstOperand === "" || operator === "" || lastOperand ==="") {
        return;
    }
    currentResult = operate(+firstOperand, +lastOperand, operator);
    firstOperand = currentResult;
    lastOperand = "";
    operator = "";
}


let firstOperand = "";
let lastOperand = "";
let operator = "";

let currentInput = "";
let currentResult = 0;

const input = document.querySelector("#input");
const result = document.querySelector("#result");

const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
[...numberButtons, ...operatorButtons].forEach(button => {
    button.onclick = (e) => {
        updateEquation(e);
    }
});

const equals = document.querySelector("#equals");
equals.onclick = () => {
    evaluate();
    updateDisplay();
};

const allClear = document.querySelector("#allClear");
allClear.onclick = () => {
    clear();
    updateDisplay();
};