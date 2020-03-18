let depositAmount;
let monthlyReplenishment;
let interestRate;
let depositTerm;
let time = 30;


function changeTime() {
    time = document.getElementById('option-select-list');
    time = time.options[document.getElementById('option-select-list').selectedIndex].value; 
    if(time == "quarterly") {
        time = 90;
    }
    else if(time == "perYear") {
        time = 360;
    }
    else if(time == "perMonth") {
        time = 30;
    }
}

function isInteger(number) {
    if(number % 1 == 0) {
        return true;
    }
    return false;
}

function isValid() {
    let errorList = ``;
    document.getElementById('error-list').innerHTML = errorList;
    depositAmount           = Number(document.getElementById('deposit-amount').value);              // начальная сумма 
    monthlyReplenishment    = Number(document.getElementById('monthly-replenishment').value);       // ежемесячная пополнение
    interestRate            = Number(document.getElementById('interest-rate').value);               // проценты 
    depositTerm             = Number(document.getElementById('deposit-term').value);                // срок вклада
    if(depositAmount > 0 && monthlyReplenishment >= 0 && (interestRate > 0 && interestRate < 100) && (isInteger(depositTerm) && depositTerm > 0)) {
        return true;
    }
    if(!(depositAmount > 0)) {
        errorList += `<li class="error-list-item">Неверный формат начальной суммы</li>`;
    }
    if(!(monthlyReplenishment >= 0)) {
        errorList += `<li class="error-list-item">Неверный формат ежемесячного пополнения</li>`;
    }
    if(!(interestRate > 0 && interestRate < 100)) {
        errorList += `<li class="error-list-item">Неверный формат процентов</li>`;
    }
    if(!(isInteger(depositTerm) && depositTerm > 0)) {
        errorList += `<li class="error-list-item">Неверный формат срока вклада</li>`;
    }
    document.getElementById('error-list').innerHTML = errorList;
    return false;
}

function calculate() {
    if(isValid()) {
        if(time == 30) {
            depositTerm = Math.floor(depositTerm / 30);
            for(let i = 0; i < depositTerm; i++) {
                depositAmount += depositAmount * ((interestRate / 12) / 100);
                depositAmount += monthlyReplenishment;
            }
            depositAmount = Math.round(depositAmount);
            alert(depositAmount);
        }
        else if(time == 90) {
            depositTerm = Math.floor(depositTerm / 90);
            for(let i = 0; i < depositTerm; i++) {
                depositAmount += depositAmount * ((interestRate / 4) / 100);
                depositAmount += monthlyReplenishment;
            }
            depositAmount = Math.round(depositAmount);
            alert(depositAmount);
        }
        else if(time == 360) {
            depositTerm = Math.floor(depositTerm / 90);
            for(let i = 0; i < depositTerm; i++) {
                depositAmount += depositAmount * ((interestRate / 1) / 100);
                depositAmount += monthlyReplenishment;
            }
            depositAmount = Math.round(depositAmount);
            alert(depositAmount);   
        }
    }
    else {
        console.log('critical error');
        alert(NaN);
        return;
    }
}


document.getElementById('option-select-list').addEventListener('change', changeTime);
document.getElementById('calculate-button').addEventListener('click', calculate);

// console.log(depositAmount);
// console.log(monthlyReplenishment);
// console.log(interestRate);
// console.log(depositTerm);
