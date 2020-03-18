let depositAmount;
let monthlyReplenishment;
let interestRate;
let depositTerm;

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
    if(depositAmount > 0 && monthlyReplenishment >= 0 && (interestRate > 0 && interestRate < 100) && isInteger(depositTerm)) {
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
    if(!isInteger(depositTerm)) {
        errorList += `<li class="error-list-item">Неверный формат срока вклада</li>`;
    }
    document.getElementById('error-list').innerHTML = errorList;
    return false;
}

function calculate() {
    if(isValid()) {
        depositTerm = Math.floor(depositTerm / 30);
        for(let i = 0; i < depositTerm; i++) {
            depositAmount += depositAmount * ((interestRate / 12) / 100);
            depositAmount += monthlyReplenishment;
        }
        depositAmount = Math.round(depositAmount);
        alert(depositAmount);
    }
    else {
        console.log('critical error');
        alert(NaN);
        return;
    }
}

document.getElementById('calculate-button').addEventListener('click', calculate);

// console.log(depositAmount);
// console.log(monthlyReplenishment);
// console.log(interestRate);
// console.log(depositTerm);