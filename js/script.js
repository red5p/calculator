let leftOperand = "";
let rightOperand = "";
let operator = "";
let currentResult = 0;

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
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
    if (operator === "") { // when there is no operator, update left operand
        if (leftOperand === "0") {
            leftOperand = e.target.textContent;
        } else {
            leftOperand += e.target.textContent;
        }
    } else if (operator !== "") { // when there is alreay an operator, update right operand
        if (rightOperand === "0") {
            rightOperand = e.target.textContent;
        } else {
            rightOperand += e.target.textContent;
        }
    }
    updateDisplay(); 
}

function updateOperator(e) {
    // should not enter operator when there's no first operand
    if (leftOperand === "") {
        return;
    }

    if (rightOperand === "") { // can update operator if right operand not entened
        operator = e.target.textContent;
    } else if (rightOperand !== "") { // if there's a right operand, result will be evaluated
        if (rightOperand === "0") {
            alertDivisionByZero();
            return;
        }
        operate(+leftOperand, +rightOperand, operator);
        leftOperand = currentResult; // make left operand the result just got
        rightOperand = "";
        operator = e.target.textContent; // set operator to the one just entered
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
        case "×":
            currentResult = multiply(a, b);
            break;
        case "÷":
            currentResult = divide(a, b);
    }
    currentResult = Math.round(currentResult * 1000) / 1000;
}

function updateDisplay() {
    input.textContent = leftOperand + operator + rightOperand;
    result.textContent = currentResult;
}

function clear() {
    leftOperand = "";
    rightOperand = "";
    operator = "";
    currentResult = 0;
    updateDisplay();
}

function evaluate() {
    if (rightOperand === "0") {
        alertDivisionByZero();
        return;
    }

    // evaluation is not allowed when the equation is now complete
    if (leftOperand === "" || operator === "" || rightOperand ==="") {
        return;
    }
    
    operate(+leftOperand, +rightOperand, operator);
    leftOperand = currentResult;
    rightOperand = "";
    operator = "";

    updateDisplay();
}