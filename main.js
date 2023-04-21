// Functions for basic math operators
function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return (Math.round(a / b * 100)) / 100;
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
    const green = ['()', '%', '÷', 'x', '-', '+'];
    const equal = '=';
    const clear = 'C';
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        if (green.includes(button.textContent)) {
            button.style.color = "#58db00";
        }
        else if (button.textContent === clear) {
            button.style.color = "#E5320E";
            button.classList.add('clear');
        } 
        else if (button.textContent === equal) {
            button.style.backgroundColor = "#398E01";
            button.classList.add('equal');
        }
    });
}

// Function that adds appropriate classes to all of the buttons
function addClasses() {
    const basicOps = ['÷', 'x', '-', '+'];
    const helpOps = ['()', '%', '+/-', '.'];
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        if (basicOps.includes(button.textContent)) {
            button.classList.add('basic-operation');
        }
        else if (helpOps.includes(button.textContent)) {
            button.classList.add('help-operation');
        }
        else if (digits.includes(button.textContent)) {
            button.classList.add('digit');
        }
    })
}

// Function hides some operator buttons
function hideButtons() {
    const helpOps = document.querySelectorAll('.help-operation');
    helpOps.forEach((help) => help.style.visibility = 'hidden');
}

// Function that creates a display for the calculator
function createDisplay() {
    const displayContainer = document.querySelector('.display-container');
    const display = document.createElement('div');
    const displayBackup = document.createElement('div');
    displayContainer.appendChild(display);
    displayContainer.appendChild(displayBackup);
    display.classList.add('display');
    displayBackup.classList.add('display-backup');    
}

// This function will listen for a click event on number buttons
function listenNumberClick() {
    const digits = document.querySelectorAll('.digit');
    
    digits.forEach((digit) => digit.addEventListener('click', populateDisplay));
}

// This function will populate display based on clicked numbers
function populateDisplay(e) {
    const displayBackup = document.querySelector('.display-backup')
    const display = document.querySelector('.display');
    display.textContent += e.target.textContent;
    displayBackup.textContent = "";
}

// Function will make the calculator work. 
// Number that user types before operator will be the first number, 
// then comes the operator and then a second operator
// After selecting equality operator, result will be shown inside display
// Also, C button will clear everything, backspace will delete last character
function calculate() {
    listenNumberClick();
    const display = document.querySelector('.display');
    const displayBackup = document.querySelector('.display-backup')
    let firstNumber = null;
    let secondNumber = null; 
    let operator = null;
    const operators = document.querySelectorAll('.basic-operation');
    const clear = document.querySelector('.clear');
    const backspace = document.querySelector('.backspace-button');
    const equal = document.querySelector('.equal');

    // Clear
    clear.addEventListener('click', (e) => {
        display.textContent = "";
        displayBackup.textContent = "";
        firstNumber = null;
        secondNumber = null;
        operator = null;
    });

    // Backspace
    backspace.addEventListener('click', (e) => {
        const textContentArr = display.textContent.split("");
        textContentArr.pop();
        display.textContent = textContentArr.join("");
    });

    // Calculation
    
    // Listen for click on the operators
    operators.forEach((op) => {
        op.addEventListener('click', (e) => {
            if (display.textContent === "") {
                displayBackup.textContent = "";
                alert("Enter a number");
            }
            else if (!firstNumber) {
                firstNumber = display.textContent;
                operator = e.target.textContent;
                display.textContent = "";
                displayBackup.textContent = "";
            }
            else {
                displayBackup.textContent = "";
                secondNumber = display.textContent;
                firstNumber = operate(firstNumber, secondNumber, operator);
                display.textContent = "";
                displayBackup.textContent = firstNumber;
                secondNumber = null;
                operator = e.target.textContent;
            }
        });
    });

    // Listen for click on the equal button 
    equal.addEventListener('click', (eq) => {
        if (!firstNumber || (!secondNumber && display.textContent === "") || !operator) {
            alert("Enter a valid operation");
        }
        else {
            secondNumber = display.textContent;
            display.textContent = operate(firstNumber, secondNumber, operator);
            firstNumber = null;
            operator = null;
            secondNumber = null;
        }
    });
}

// Main part of the program that calls all other functions
createButtons();
addClasses();
hideButtons();
createDisplay();
calculate();