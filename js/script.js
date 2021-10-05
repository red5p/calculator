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
    currentInput += input;
}

function updateDisplay() {
    input.textContent = currentInput;
}


let currentInput = "";

const input = document.querySelector("#input");

const numberButtons = document.querySelectorAll("#buttons .number");
numberButtons.forEach(button => {
    button.onclick = (e) => {
        updateCurrentInput(e);
        updateDisplay();
    }
});
