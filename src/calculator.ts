let currentInput: string = '';
let previousInput: string = '';
let currentOperation: string | null = null;

document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('number-button')) {
        const num = parseInt(target.textContent || '');
        inputNumber(num);
    } else if (target.classList.contains('operator-button')) {
        const op = target.textContent;
        if (op !== null) {
            inputOperator(op);
        }
    } else if (target.classList.contains('clear-button')) {
        clearDisplay();
    } else if (target.classList.contains('result-button')) {
        calculateResult();
    }
});

function calculateResult() {
    if (!isValidInput(currentInput) || !isValidInput(previousInput) || currentOperation === null) {
        return;
    }

    const num1: number = parseFloat(previousInput);
    const num2: number = parseFloat(currentInput);

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

function inputNumber(num: number) {
    currentInput += num.toString();
    updateDisplay();
}

function inputOperator(op: string) {
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
    const display = document.getElementById('display') as HTMLInputElement;
    if (display) {
        display.value = currentInput;
    }
}

function isValidInput(str: string): boolean {
    const num = parseFloat(str);
    return !isNaN(num) && isFinite(num);
}