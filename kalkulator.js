let firstInputId = document.getElementById('firstInputId');
let secondInputId = document.getElementById('secondInputId');
let inputTag = document.getElementsByTagName('input');
let buttons = document.getElementsByClassName('sign');
let result;
let comment;
let inputs = [];
let firstInput;
let secondInput;
let sign;
let dataValid = true;
let dataInvalid = false;
let noSign = true;

for (let i = 0; i < inputTag.length; i++) {
    inputTag[i].onchange = function () {
        clearAll();
        takeInput();
    }
}

function clearAll() {
    result = '';
    resultId.innerText = '';
    equalId.innerText = '';
    comment = '';
    commentId.innerText ='';
    firstInputId.classList.remove('no-input');
    secondInputId.classList.remove('no-input');
}

function takeInput() {
    firstInput = firstInputId.value;
    secondInput = secondInputId.value;
    inputs = [firstInput, secondInput];
    dataValid = true;

    // sprawdzanie, czy pola są prawidłowo wypełnione (dla przeglądarek nie osługujących input type="number")
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i] === '' || isNaN(inputs[i]) || inputs[i] === true || inputs[i] === false) {
            inputTag[i].classList.add('no-input');
            comment = 'Wypełnij poprawnie wszystkie pola';
            commentId.innerText = comment;
            dataValid = false;
        }
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        if (dataValid === true) {
            clearAll();
            chooseSign(this);
        }
    }
}

function chooseSign(el) {
    sign = el.innerHTML;
    noSign = false;
    signId.innerHTML = sign;
    return sign;
}

sign2Id.onclick = function () {
    calculateResult(sign);
}

function calculateResult(sign) {
    takeInput();

    // liczenie i walidacja dla dzielenia przez 0
    dataInvalid = false;
    firstNumber = new Big(firstInput);
    secondNumber = new Big(secondInput);
    
    if (sign === '+') {
        result = firstNumber.plus(secondNumber);
    }
    else if (sign === '-') {
        result = firstNumber.minus(secondNumber);
    }
    else if (sign === '/') {
        if (secondNumber == 0) {
            dataInvalid = true;
            secondInputId.classList = 'no-input';
        }
        else {
            result = firstNumber.div(secondNumber);
        }
    }
    else if (sign === '<span>*</span>') {
        result = firstNumber.times(secondNumber);
    }
    showResult();
}

function showResult() {
    if (dataInvalid === false && dataValid === true && noSign === false) {
        equalId.innerText = '=';
        resultId.innerText = result;
    }
    else if (dataValid === false) {
        comment = 'Wypełnij poprawnie wszystkie pola';
    }
    else if (noSign === true) {
        comment = 'Wybierz działanie';
    }
    else {
        comment = 'Podałeś nieprawidłowe dane!'; 
    }
    commentId.innerText = comment;
}
