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

function updateCurrentInput(e) {
    // if is number and operator is empty, append to first operand
    // if is operator and last operand is empty, add to operator
    // if is a number and operator is not empty, append to last operand
    // !if it is = and operand 2 is not empty, calculate result, make result the first operand
    // !if it is operator(not equals) and operand 2 not empty, calculate result and add opeartor
    const targetClassList = Array.from(e.target.classList);
    if (targetClassList.includes("number") && operator === "") {
        firstOperand += e.target.textContent;
    } else if (targetClassList.includes("operator") && lastOperand === "") {
        operator = e.target.textContent;
    } else if (targetClassList.includes("number") && operator !== "") {
        lastOperand += e.target.textContent;
    } else if (e.target.id === "equals" && lastOperand !== "") {
        const result = operate(+firstOperand, +lastOperand, operator);
        firstOperand = result.toString();
        lastOperand = "";
        operator = "";
    } else if (targetClassList.includes("operator") && lastOperand !== "") {
        const result = operate(+firstOperand, +lastOperand, operator);
        firstOperand = result.toString();
        lastOperand = "";
        operator = operator;
    }
}

function updateDisplay() {
    display.textContent = firstOperand + operator + lastOperand;
}

function clear() {
    firstOperand = "";
    lastOperand = "";
    operator = "";
}


let firstOperand = "";
let lastOperand = "";
let operator = "";

const display = document.querySelector("#display");

const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
[...numberButtons, ...operatorButtons].forEach(button => {
    button.onclick = (e) => {
        updateCurrentInput(e);
        updateDisplay();
    }
});

const allClear = document.querySelector("#allClear");
allClear.onclick = () => {
    clear();
    updateDisplay();
};