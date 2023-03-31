//  The goal of this application is to perform basic calculator
//  arithmatic tasks.  It can only perform simple eqautions—that
//  is, inputs with two eqautions.  This resolves the difficulty 
//  of handling the login of order of operation.
//
//  If you read the equation left-to-right, it would go like this:
//  bottomRowNumber <operation> topRowNumber = result.
let bottomRowNumber = '';
let topRowNumber = '';

const topRow = document.querySelector('.top-row');
const bottomRow = document.querySelector('.bottom-row');

const renderBottomRow = () => {
    if (bottomRowNumber.length > 10) {
        bottomRowNumber = bottomRowNumber.substring(0, 10);
    }
    bottomRow.textContent = bottomRowNumber;
}

const renderTopRow = () => {
    topRow.textContent = topRowNumber;
}

const createEquation = (symbol) => {
    topRowNumber = `${bottomRowNumber} ${symbol}`;
    renderTopRow();
    bottomRowNumber = ' ';
    renderBottomRow();
}

const clear = () => {
    topRowNumber = '';
    bottomRowNumber = '';
    renderTopRow();
    renderBottomRow();
}

const dlt = () => {
    const deletedNum = bottomRowNumber.split('').slice(0, -1).join('');
    bottomRowNumber = deletedNum;
    renderBottomRow();
}

const operate = (numberOne, numberTwo, operant) => {
    switch (operant) {
        case '+':
            return (numberOne + numberTwo).toString();
            break;
        case '-':
            return (numberOne - numberTwo).toString();
            break;
        case 'x':
            return (numberOne * numberTwo).toString();
            break;
        case '÷':
            return (numberOne / numberTwo).toString();
            break;
    }
}

const handleEquals = e => {
    if (!topRowNumber) {
        clear();
    } else {
        const valueOne = parseFloat(topRowNumber.split(' ')[0]);
        const valueTwo = parseFloat(bottomRowNumber);
        const operator = topRowNumber.split(' ')[1];
        const result = operate(valueOne, valueTwo, operator);
        bottomRowNumber = result;
        renderBottomRow();
        topRowNumber = '';
        renderTopRow();
    }
    
}

const overideOrderOfOperations = () => {
    const valueOne = parseFloat(topRowNumber.split(' ')[0]);
    const valueTwo = parseFloat(bottomRowNumber);
    const operator = topRowNumber.split(' ')[1];
    const result = operate(valueOne, valueTwo, operator);
    bottomRowNumber = result.toString();
    if (bottomRowNumber.length > 10) {
        bottomRowNumber = bottomRowNumber.substring(0, 10)
    }
}

const handleKeyboardInput = e => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const splitUp = e.code.split('');
    const lastDigit = splitUp[splitUp.length -1];
    if (e.code === 'Digit8' && e.shiftKey) {
        topRowNumber && overideOrderOfOperations();
        bottomRowNumber && createEquation('x');
    } else if (digits.includes(lastDigit)) {
        bottomRowNumber += lastDigit;
        renderBottomRow();
    } else if (e.code === 'Period') {
        bottomRowNumber += '.';
        bottomRowNumber && renderBottomRow()
    } else if (e.code === 'Backspace') {
        dlt();
    } else if (e.code === 'Equal' && e.shiftKey) {
        topRowNumber && overideOrderOfOperations();
        bottomRowNumber && createEquation('+');
    } else if (e.code === 'Minus') {
        topRowNumber && overideOrderOfOperations();
        bottomRowNumber && createEquation('-');
    } else if (e.code === 'Slash') {
        topRowNumber && overideOrderOfOperations();
        bottomRowNumber && createEquation('÷');
    } else if (e.code === 'Enter') {
        handleEquals();
    }
}






document.querySelectorAll('.num').forEach(num => {
    num.addEventListener('click', e => {
        if (bottomRowNumber.length < 12 && parseInt(e.target.textContent) || e.target.textContent === '0' || (e.target.textContent === '.' && !bottomRowNumber.includes('.'))) {
            bottomRowNumber += e.target.textContent;
        }
        renderBottomRow();
    })
})

document.querySelectorAll('.operator').forEach(operator => {
    operator.addEventListener('click', e => {
        if (topRowNumber) {
            overideOrderOfOperations();
        }
        bottomRowNumber && createEquation(e.target.textContent);
    })
})

document.querySelector('#operatorEquals').addEventListener('click', handleEquals);

document.querySelector('#clear').addEventListener('click', clear);

document.querySelector('#delete').addEventListener('click', dlt);

window.addEventListener('keydown', handleKeyboardInput)