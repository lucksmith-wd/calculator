let operand1 = null;
let operand2 = null;
let operator = null;

const display = document.querySelector('.calc-display');
display.textContent = '0';

const numBtns = [...document.querySelectorAll('.num')];
numBtns.forEach(btn => btn.addEventListener('click', numBtnClicked));

const opBtns = [...document.querySelectorAll('.op')];
opBtns.forEach(btn => btn.addEventListener('click', setOperator))

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', operate);

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearDisplay);

const backSpaceBtn = document.querySelector('.back');
console.log(backSpaceBtn);
backSpaceBtn.addEventListener('click', backSpace);

let opBtnClicked = true; // If true, userinput will start a new number. 
let fromNumInput = false;

let clickCount = 0; // Couns how many times the equals btn is clicked in a row
let temp = 0; // stores the last value in case the user clicks the equals btn several times

function backSpace() {
    if (display.textContent.length > 0) {
        let newText = display.textContent.substring(0, display.textContent.length - 1)
        if (newText.length == 0) {
            display.textContent = '0';
            opBtnClicked = true;
        } else {
            display.textContent = newText.length == 0 ? '0' : newText;
        }
    } else {
        opBtnClicked = true;
    }

}

function setOperator() {
    clickCount = 0;
    opBtnClicked = true;
    if (operand1 === null) {
        operand1 = +display.textContent;
    } else if (fromNumInput) {
        operand2 = +display.textContent;
    }
    if (!(operand2 === null)) {
        operate();
    }
    operator = this.textContent;
    numBtns.forEach(btn => btn.addEventListener('click', numBtnClicked));
    fromNumInput = false
}

function operate() {
    if (operand1 === null) return;
    let result;
    if (++clickCount > 1) {
        operand2 = temp;
    } else if (operand2 === null && !(operand1 === null)) {
        operand2 = +display.textContent;
    }
    switch (operator) {
        case '+': result = operand1 + operand2;
            break;
        case '–': result = operand1 - operand2;
            break;
        case '×': result = operand1 * operand2;
            break;
        case '÷': result = operand2 == 0 ? 'ERR. Press C' : operand1 / operand2;
        }
    
    if (('' + result).length > 16) {
        result = +('' + result).substring(0, 16);
    }
    display.textContent = result;
    operand1 = result;
    temp = operand2;
    operand2 = null;
    numBtns.forEach(btn => btn.removeEventListener('click', numBtnClicked));
    fromNumInput = false;
}

function numBtnClicked() {
    clickCount = 0;
    fromNumInput = true;
    if (opBtnClicked) {
        display.textContent = '';
        opBtnClicked = false;
    }
    if (display.textContent.length < 15) {
        let updated = display.textContent + this.textContent;
        if(updated !== '00') {
            display.textContent = updated;
        }
        
        
    }
}

function clearDisplay() {
    numBtns.forEach(btn => btn.addEventListener('click', numBtnClicked));
    operand1 = null;
    operand2 = null;
    operator = null;
    display.textContent = '0';
    opBtnClicked = true;
}

