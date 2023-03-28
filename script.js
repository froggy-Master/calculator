let currentNumber = '';
let currentEquation = '';

function setCurrentNumber() {
    if (parseInt(this.textContent) || this.textContent === '0') currentNumber += this.textContent;
    setBottomRow();
};

function setCurrentEquation() {
    if (currentNumber) {
        currentEquation = currentNumber;
        currentEquation += ` ${this.textContent}`;
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

function operate() {
    if (currentEquation.split(' ').length === 2) {

        const operant = currentEquation.split(' ')[0];

        switch (currentEquation.split(' ')[1]) {
            case '+':
                currentNumber = (parseInt(operant) + parseInt(currentNumber)).toString();
                setCurrentNumber();
                break;
            case '-':
                currentNumber = (parseInt(operant) - parseInt(currentNumber)).toString();
                setCurrentNumber();
                break;
            case 'x':
                currentNumber = (parseInt(operant) * parseInt(currentNumber)).toString();
                setCurrentNumber();
                break;
            case '÷':
                currentNumber = (parseInt(operant) / parseInt(currentNumber)).toString();
                setCurrentNumber();
                break;
        }
    }
}



document.getElementById('operatorEquals').addEventListener('click', operate)






document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', setCurrentNumber);
})

document.querySelectorAll('.operator').forEach(operator => {
    operator.addEventListener('click', setCurrentEquation);
})