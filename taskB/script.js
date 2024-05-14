function addToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    let display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch(error) {
        display.value = 'Error';
    }
}

function copyToClipboard() {
    let display = document.getElementById('display');
    display.select();
    navigator.clipboard.writeText(display.value);
}

function isAllowedKey(event) {
    let allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '(', ')'];
    let keyPressed = String.fromCharCode(event.which || event.keyCode);
    return allowedKeys.includes(keyPressed);
}