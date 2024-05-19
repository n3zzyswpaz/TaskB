document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', (event) => {
        if (button.classList.contains('number') || button.classList.contains('operator') || button.classList.contains('decimal')) {
            addToDisplay(button.textContent);
        }
    });
});

document.querySelector('.clearAll').addEventListener('click', (event) => {
    clearDisplay();
});

document.querySelector('.clear').addEventListener('click', (event) => {
    backspace();
});

document.querySelector('.copy').addEventListener('click', (event) => {
    copyToClipboard();
});

document.querySelector('.equals').addEventListener('click', (event) => {
    calculate();
});

document.querySelector('.result').addEventListener('keypress', function(event) {
    if (!isAllowedKey(event)) {
        event.preventDefault();
    }
});

function addToDisplay(value) {
    let result = document.querySelector('.result')
    if ((result.value === '0')) {
        if (value === '0') {
            return;
        } else if (value !== '.') {
            result.value = '';
        }
    }
    document.querySelector('.result').value += value;
}

function clearDisplay() {
    document.querySelector('.result').value = '0';
    document.querySelector('.history').textContent = '';
}

function backspace() {
    let result = document.querySelector('.result');
    result.value = result.value.slice(0, -1);
}

function calculate() {
    let result = document.querySelector('.result');
    let expression = document.querySelector('.result').value;
    if (!areBracketsBalanced(result.value) && (result.value.toString().includes('(') || result.value.toString().includes(')'))) {
        showNotification('Ошибка в скобках.')
    } else {
        try {
            result.value = eval(result.value);
            document.querySelector('.history').textContent = expression + ' = ' + result.value;
        } catch(error) {
            showNotification('Ошибка в формуле.')
        }
    }
}

function copyToClipboard() {
    let result = document.querySelector('.result');
    result.select();
    navigator.clipboard.writeText(result.value);
    showNotification('Результат скопирован в буфер обмена');
}

function isAllowedKey(event) {
    let allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '(', ')'];
    let keyPressed = String.fromCharCode(event.which || event.keyCode);
    if (allowedKeys.includes(keyPressed)) {
        addToDisplay(keyPressed);
    }

    return false;
}

function areBracketsBalanced(expr) {
    let stack = [];
    for(let i = 0; i < expr.length; i++) {
        let x = expr[i];
    
        if (x == '(')
        {
            stack.push(x);
            continue;
        }
    
        if (stack.length == 0)
            return false;
                
        let check;
        switch (x){
        case ')':
            check = stack.pop();
        }
    }
    return (stack.length === 0);
}

function showNotification(message) {
    let notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.querySelector('.notifier').appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

document.querySelector('.result').focus();