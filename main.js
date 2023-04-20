// Functions for basic math operators
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

// Function that takes an operator and 2 numbers and calls one of the above functions
function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case 'x':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        case '÷':
            return divide(firstNumber, secondNumber);
        default:
            return "ERROR";
    }
}

// Function that creates buttons for each digit, operation, equalization and a clear button
function createButtons() {
    const buttonsContainer = document.querySelector('.button-container');
    const buttonsArray = ['C', '()', '%', '÷', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '='];
    for (let i = 0; i < buttonsArray.length; i++) {
        const button = document.createElement('button');
        buttonsContainer.appendChild(button);
        button.classList.add('button');
        button.textContent = buttonsArray[i];
        if ((i + 1) % 4 === 0 && i > 2) {
            const br = document.createElement('br');
            buttonsContainer.appendChild(br);
            br.className = "break";
        }
    }

    colorButtons();
}

// Function that colors some buttons
function colorButtons() {
    const green = ['()', '%', "÷", 'x', '-', '+'];
    const equal = '=';
    const clear = 'C';
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        if (green.includes(button.textContent)) {
            button.style.color = "#58db00";
        }
        else if (button.textContent === clear) {
            button.style.color = "#E5320E";
        } 
        else if (button.textContent === equal) {
            button.style.backgroundColor = "#398E01";
        }
    });
}

// Function that creates a display for the calculator
function createDisplay() {
    const displayContainer = document.querySelector('.display-container');
    const display = document.createElement('div');
    displayContainer.appendChild(display);
    display.classList.add('display');

    display.textContent = '1231';
}

// Main part of the program that calls all other functions
let firstNumber, secondNumber, operator;
createButtons();
createDisplay();
