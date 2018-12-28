let button = document.getElementById('sign2');
let signId = document.getElementById('sign');
let equalId = document.getElementById('equal');
let resultId = document.getElementById('result');
let firstInputId = document.getElementById('firstInput');
let secondInputId = document.getElementById('secondInput');
let result;
let dataValid = true;
let dataInvalid = false;
let inputTag = document.getElementsByTagName('input');
let buttons = document.getElementsByClassName('sign');
let inputs = [];
let firstInput;
let secondInput;
let sign;

for (let i = 0; i < inputTag.length; i++) {
    inputTag[i].onchange = function () {
        console.log('input change');
        clearAll();
        takeInput();
    }
}

function clearAll() {
    result = '';
    resultId.innerText = '';
    resultId.removeAttribute('class');
    equalId.innerText = '';
    firstInputId.removeAttribute('class');
    secondInputId.removeAttribute('class');
}

function takeInput() {
    firstInput = firstInputId.value;
    secondInput = secondInputId.value;
    inputs = [firstInput, secondInput];

    // sprawdzanie, czy pola są wypełnione
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i] === '') {
            dataValid = false;
        }
        else {
            dataValid = true;
        }
    }
    if (firstInput === '') {
        firstInputId.className = 'no-input';
    }
    if (secondInput === '') {
        secondInputId.className = 'no-input';
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        clearAll();
        chooseSign(this);
    }
}

function chooseSign(el) {
    sign = el.innerHTML;
    signId.innerHTML = sign;
    return sign;
}

button.onclick = function () {
    calculateResult(sign);
}

function calculateResult(sign) {
    takeInput();
    // liczenie i walidacja wyniku
    if (dataValid === true) {
        dataInvalid = false;
        firstNumber = Number(firstInput);
        secondNumber = Number(secondInput);
        console.log(firstNumber, secondNumber);
        if (sign === '+') {
            result = firstNumber + secondNumber;
        }
        else if (sign === '-') {
            result = firstNumber - secondNumber;
        }
        else if (sign === '/') {
            result = firstNumber / secondNumber;
            if (secondNumber === 0) {
                dataInvalid = true;
            }
        }
        else {
            result = firstNumber *= secondNumber;
        }
    }
    showResult();
}

function showResult() {
    if (dataInvalid === false) {
        equalId.innerText = '=';
    }
    else {
        result = 'Podałeś nieprawidłowe dane!';
        resultId.className = 'invalid';
    }
    resultId.innerText = result;
}
