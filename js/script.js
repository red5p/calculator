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
    let result;
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "x":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
    }
    return Math.round(result * 1000) / 1000;
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