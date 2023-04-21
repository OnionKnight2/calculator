// Functions for basic math operators
function add(a, b) {
    return (Math.round((Number(a) + Number(b)) * 100)) / 100;
}

function subtract(a, b) {
    return (Math.round((a - b) * 100)) / 100;
}

function multiply(a, b) {
    return (Math.round(a * b * 100)) / 100
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
        case '×':
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
    const buttonsArray = ['C', '()', '%', '÷', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '='];
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
    const green = ['()', '-', '+'];
    const weird = ['÷', '×'];
    const equal = '=';
    const clear = 'C';
    const dot = '.';
    const reverse = '+/-';
    const percentage = '%';
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
            button.classList.add('equal');
        }
        else if (button.textContent === dot) {
            button.classList.add('dot');
        }
        else if (button.textContent === reverse) {
            button.classList.add('reverse');
        }
        else if (button.textContent === percentage) {
            button.classList.add('percentage');
            button.style.color = "#58db00";
        }
        else if (weird.includes(button.textContent)) {
            button.style.color = '#58db00';
            if (button.textContent === '÷') {
                button.classList.add('divide');
            } else button.classList.add('multiply');
        }
    });
}

// Function that adds appropriate classes to all of the buttons
function addClasses() {
    const basicOps = ['÷', '×', '-', '+'];
    const helpOps = ['()'];
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

// Function will add same logic only for keyboard inputs
function enterKeys() {
    const digitButtons = document.querySelectorAll('.digit');
    const operationButtons = document.querySelectorAll('.basic-operation');
    document.addEventListener('keydown', (e) => {
        digitButtons.forEach((btn) => {
            if (btn.textContent === e.key) {
                btn.click();
                changeClickColors(btn, "#121111", "#4a4545");
            }
        });

        operationButtons.forEach((btn) => {
            if (btn.textContent === e.key) {
                btn.click();
                changeClickColors(btn, "#121111", "#4a4545");
            }
            if (e.key === '/') {
                document.querySelector('.divide').click();
                changeClickColors(document.querySelector('.divide'), "#121111", "#4a4545");
            }
            if (e.key === '*') {
                document.querySelector('.multiply').click();
                changeClickColors(document.querySelector('.multiply'), "#121111", "#4a4545");
            }
        });

        switch (e.key) {
            case 'c':
                document.querySelector('.clear').click();
                changeClickColors(document.querySelector('.clear'), "#121111", "#4a4545");
                break;
            case '%':
                document.querySelector('.percentage').click();
                changeClickColors(document.querySelector('.percentage'), "#121111", "#4a4545");
                break;
            case '.':
                document.querySelector('.dot').click();
                changeClickColors(document.querySelector('.dot'), "#121111", "#4a4545");
                break;
            case 'Backspace':
                document.querySelector('.backspace-button').click();
                changeClickColors(document.querySelector('.backspace-button'), "#121111", "#4a4545");
                break;
            case '=':
            case 'Enter':
                document.querySelector('.equal').click();
                changeClickColors(document.querySelector('.equal'), "#398E01", "darkgreen");
                break;
        }
    });
}

// Function will change colors of the buttons when they are hovered
function changeHoverColors() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((btn) => {
        if (btn.textContent !== '=' && !btn.classList.contains('backspace-button')) {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = "#4a4545";
                btn.style.transition = "font-size 0.1s";
                btn.style.fontSize = "20px";
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = "#121111";
                btn.style.fontSize = "28px";
            })
        } 
        else if (btn.textContent === '=') {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = "darkgreen";
                btn.style.transition = "font-size 0.1s";
                btn.style.fontSize = "20px";
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = "#398E01";
                btn.style.fontSize = "28px";
            })
        }
        else {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = "#4a4545";
                btn.style.transition = "font-size 0.1s";
                btn.style.fontSize = "12px";
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = "#121111";
                btn.style.fontSize = "16px";
            });
        }
    });
}

// Function will change colors of the buttons when they are clicked
function changeClickColors(btn, defaultColor, newColor) {
    btn.style.backgroundColor = newColor;

    setTimeout(() => {
        btn.style.backgroundColor = defaultColor;
    }, 150);
}

// Function will make the calculator work. 
// Number that user types before operator will be the first number, 
// then comes the operator and then a second operator
// After selecting equality operator, result will be shown inside display
// Also, C button will clear everything, backspace will delete last character
// Enable user to input decimals via a . button
function calculate() {
    changeHoverColors();
    enterKeys();
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
    const dot = document.querySelector('.dot');
    const reverse = document.querySelector('.reverse');
    const percentage = document.querySelector('.percentage');

    // Clear
    clear.addEventListener('click', (e) => {
        display.textContent = "";
        displayBackup.textContent = "";
        firstNumber = null;
        secondNumber = null;
        operator = null;
        dot.disabled = false;
        
    });

    // Backspace
    backspace.addEventListener('click', (e) => {
        const textContentArr = display.textContent.split("");
        if (textContentArr.pop() === '.') {
            dot.disabled = false;
        }
        display.textContent = textContentArr.join("");
    });

    // Calculation
    
    // Listen for click on the operators
    operators.forEach((op) => {
        op.addEventListener('click', (e) => {
            if (display.textContent === "") {
                displayBackup.textContent = "";
            }
            else if (!firstNumber) {
                firstNumber = display.textContent;
                operator = e.target.textContent;
                display.textContent = "";
                displayBackup.textContent = "";
                dot.disabled = false;
            }
            else {
                displayBackup.textContent = "";
                secondNumber = display.textContent;
                firstNumber = operate(firstNumber, secondNumber, operator);
                display.textContent = "";
                displayBackup.textContent = firstNumber;
                secondNumber = null;
                operator = e.target.textContent;
                dot.disabled = false;
            }
        });
    });

    // Listen for click on the equal button 
    equal.addEventListener('click', () => {
        if (!firstNumber || (!secondNumber && display.textContent === "") || !operator) {      
        }
        else {
            secondNumber = display.textContent;
            display.textContent = operate(firstNumber, secondNumber, operator);
            firstNumber = null;
            operator = null;
            secondNumber = null;
            dot.disabled = true;
        }
    });

    // Listen for a click on a dot button
    dot.addEventListener('click', () => {
        if (display.textContent === "") {
        }
        else if (!dot.disabled) {
            display.textContent += '.';
            dot.disabled = true;
        }
    });

    // Listen for a click on a +/- button that returns number * (-1)
    reverse.addEventListener('click', () => {
        if (display.textContent === "" || display.textContent.charAt(display.textContent.length - 1) === ".") {}
        else {
            display.textContent *= (-1);
        }
    });

    // Listen for a click on a % button that changes number into a percentage
    percentage.addEventListener('click', () => {
        if (display.textContent === "" || display.textContent.charAt(display.textContent.length - 1) === ".") {}
        else {
            display.textContent = display.textContent / 100;
        }
    });
}

// Main part of the program that calls all other functions
createButtons();
addClasses();
hideButtons();
createDisplay();
calculate();