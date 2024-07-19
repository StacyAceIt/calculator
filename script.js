const screen = document.getElementById("screen");
let isFloat = false;
let previousOperator = "";
let stack = [];

function concatScreenContent(text){
    screen.textContent += text;
}
function replaceScreenContent(text){
    screen.textContent = text;
}
function resetScreenToZero(){
    screen.textContent = "0";
    isFloat = false;
}

const errorSound = new Audio('./audio/minecraft_click.mp3');
const numberButtons = document.querySelectorAll(".numberButton");
//ensure numbers are displayed properly and push operators 
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        handleNumberButtonClick(numberButton.textContent);
    });
});

function handleNumberButtonClick(text) {
    if (previousOperator) {
        processPreviousOperator();
    }
    if (text === ".") {
        handleDecimalPoint();
    } else {
        handleNumber(text);
    }
}

function processPreviousOperator() {
    stack.push(previousOperator);
    previousOperator = "";
    console.log(stack);
    resetScreenToZero();
}

function handleDecimalPoint() {
    if (isFloat) {
        errorSound.play();
    } else {
        concatScreenContent(".");
        isFloat = true;
    }
}

function handleNumber(text) {
    if (screen.textContent === "0") {
        replaceScreenContent(text);
    } else {
        concatScreenContent(text);
    }
}
//operator clicked: push previous number to stack if stack is empty or stack[-1] is an operator
//set previousOperator 
//we do push NaN

const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () =>{
        if (!stack || operatorButtonsSet.has(stack[-1])){
            
            stack.push(screen.textContent);
            console.log(stack);
        }
        previousOperator = operatorButton.textContent;
    });
})

const negateButton = document.querySelector(".\\+\\/\\-");
negateButton.addEventListener("click", () => {
    let newValue = +screen.textContent * -1;
    isFloat = (!Number.isInteger(newValue)) ? true : false;
    replaceScreenContent(`${newValue}`);
});

const percentageButton = document.querySelector(".\\%");
percentageButton.addEventListener("click", () => {
    let newValue = +screen.textContent / 100;
    isFloat = (!Number.isInteger(newValue)) ? true : false;
    replaceScreenContent(`${newValue}`);
});



