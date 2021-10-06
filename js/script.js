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

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            add(a, b); //? where should the return value go?
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
    }
}

function updateCurrentInput(e) {
    const input = e.target.textContent;
    // if is number and operator is empty, append to first operand
    // if is operator and last operand is empty, add to operator
    // if last operand is not empty, calculate and display result

    currentInput += input;
}

function updateDisplay() {
    input.textContent = currentInput;
}


let currentInput = "";

let firstOperand = "";
let lastOperand = "";
let operator = "";

const input = document.querySelector("#input");

const numberButtons = document.querySelectorAll("#buttons .number");
numberButtons.forEach(button => {
    button.onclick = (e) => {
        updateCurrentInput(e);
        updateDisplay();
    }
});