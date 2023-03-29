let currentNumber = '';
let currentEquation = '';

function setCurrentNumber() {
    if (parseInt(this.textContent) || this.textContent === '0' || (this.textContent === '.' && !currentNumber.includes('.'))) {
        currentNumber += this.textContent;
    }
    setBottomRow();
};

function setCurrentEquation(value) {
    currentEquation && operate();

    if (currentNumber) {
        currentEquation = currentNumber;
        currentEquation += ` ${value}`;
        setTopRow();
        currentNumber = '';
        setBottomRow();
    }
}

function setBottomRow() {
    document.querySelector('.bottom-row').textContent = currentNumber;
}

function setTopRow() {
    document.querySelector('.top-row').textContent = currentEquation;
}

function clear() {
    currentNumber = '';
    currentEquation = '';
    setTopRow();
    setBottomRow();
}

function dlt() {
    currentNumber = currentNumber.split('').slice(0, -1).join('');
    setBottomRow();
}

function operate() {
    if (currentEquation.split(' ').length > 1) {

        const operant = currentEquation.split(' ')[0];

        switch (currentEquation.split(' ')[1]) {
            case '+':
                currentNumber = (Math.floor((parseFloat(operant) + parseFloat(currentNumber)) * 1000000) / 1000000).toString();
                break;
            case '-':
                currentNumber = (Math.floor((parseFloat(operant) - parseFloat(currentNumber)) * 1000000) / 1000000).toString();
                break;
            case 'x':
                currentNumber = (Math.floor((parseFloat(operant) * parseFloat(currentNumber)) * 1000000) / 1000000).toString();
                break;
            case '÷':
                currentNumber = (Math.floor((parseFloat(operant) / parseFloat(currentNumber)) * 1000000) / 1000000).toString();
                break;
        }
    }
}

function handleKeyboardInput(e) {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const splitUp = e.code.split('');
    const lastDigit = splitUp[splitUp.length -1];
    if (e.code === 'Digit8' && e.shiftKey) {
        setCurrentEquation('x');
    } else if (digits.includes(lastDigit)) {
        currentNumber += lastDigit;
        setBottomRow();
    } else if (e.code === 'Period') {
        currentNumber += '.';
        setBottomRow()
    } else if (e.code === 'Backspace') {
        dlt();
    } else if (e.code === 'Equal' && e.shiftKey) {
        setCurrentEquation('+');
    } else if (e.code === 'Minus') {
        setCurrentEquation('-');
    } else if (e.code === 'Slash') {
        setCurrentEquation('÷')
    } else if (e.code === 'Enter') {
        operate();
        setBottomRow()
        currentEquation = '';
        setTopRow();
    }
}
   

    












window.addEventListener('keydown', handleKeyboardInput)

document.getElementById('operatorEquals').addEventListener('click', () => {
    operate();
    currentEquation = '';
    setTopRow();
})

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', setCurrentNumber);
})

document.querySelectorAll('.operator').forEach(operator => {
    operator.addEventListener('click', (e) => {
        setCurrentEquation(e.target.textContent)
    });
})

document.querySelector('#clear').addEventListener('click', clear);

document.querySelector('#delete').addEventListener('click', dlt)