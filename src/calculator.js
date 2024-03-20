var currentInput = '';
var previousInput = '';
var currentOperation = null;
document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('number-button')) {
        var num = parseInt(target.textContent || '');
        inputNumber(num);
    }
    else if (target.classList.contains('operator-button')) {
        var op = target.textContent;
        if (op !== null) {
            inputOperator(op);
        }
    }
    else if (target.classList.contains('clear-button')) {
        clearDisplay();
    }
    else if (target.classList.contains('result-button')) {
        calculateResult();
    }
});
function calculateResult() {
    if (!isValidInput(currentInput) || !isValidInput(previousInput) || currentOperation === null) {
        return;
    }
    var num1 = parseFloat(previousInput);
    var num2 = parseFloat(currentInput);
    switch (currentOperation) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '/':
            currentInput = (num1 / num2).toString();
            break;
    }
    previousInput = '';
    updateDisplay();
}
function inputNumber(num) {
    currentInput += num.toString();
    updateDisplay();
}
function inputOperator(op) {
    if (currentOperation !== null) {
        calculateResult();
    }
    currentOperation = op;
    previousInput = currentInput;
    currentInput = '';
}
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    updateDisplay();
}
function updateDisplay() {
    var display = document.getElementById('display');
    if (display) {
        display.value = currentInput;
    }
}
function isValidInput(str) {
    var num = parseFloat(str);
    return !isNaN(num) && isFinite(num);
}
