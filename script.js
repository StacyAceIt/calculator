const screen = document.getElementById("screen");
let canPushNumber = true;
let isFloat = false;
let previousOperator = null;
let previousValue = screen.textContent;
let stack = [];
//2d array: 
//push screen number when press operator
//when pressing currentOperator, if previousOperator is */, 
//push screenNumber to inside 2d array
//when pressing currentOperator, if previousOperator is +-, add previousValue new subarray
//1 + : [[1]] show 1
//1 + 2: show 2
//1 + 2 +; [[1], [2]] : show 3
//1 + 2 * : [[1], [2]] // show 2
//1 + 2 + 1; [[1], [2]] : show 3 => get linear combo of all values
//1 + 2 * 1: [[1], [2]] // show 2 => get product of last subarray
//1 + 2 * 1 +; [[1], [2,1]] : show 3 => get linear combo of all values 
//merge last subarray and then combine all subarrays
//1 + 2 * 1 *: [[1], [2,1]] // show 2 => get product of last subarray
//merge last subarray

//press operator: change showing
//press number: compute

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
//after number is clicked
function handleNumberButtonClick(text) {
    //if canPushNumber === false, the previous symbol 
    if (!canPushNumber) {
        resetScreenToZero();
        canPushNumber = true;
    }
    if (text === ".") {
        handleDecimalPoint();
    } else {
        handleNumber(text);
    }
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
//push previousValue after clicking a new operator
function pushPreviousValue(value, previousOperator){
    switch (previousOperator){
        case "*":
            stack[stack.length - 1].push(value);
            break;
        case "/":
            stack[stack.length - 1].push(1/value);
            break;
        case "-":
            stack.push([-value]);
            break;
        default:
            stack.push([value]);
    }
    console.log(stack);
}

//operator clicked: push previous number to stack if stack is empty or stack top is an operator
//set previousOperator 
//we do push NaN
const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () =>{
        if (canPushNumber){
            previousValue = screen.textContent;
            pushPreviousValue(previousValue, previousOperator);     
            //can't push again after pushing number     
            canPushNumber = false;
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



