const screen = document.getElementById("screen");
let canPushNumber = true;
let isFloat = false;
let previousOperator = null;
let previousValue = screen.textContent;
let subarrayNumberStack = [];
let tmpResult = null;

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
            subarrayNumberStack[subarrayNumberStack.length - 1].push(+value);
            break;
        case "/":
            subarrayNumberStack[subarrayNumberStack.length - 1].push(1/value);
            break;
        case "-":
            subarrayNumberStack.push([-value]);
            break;
        default:
            subarrayNumberStack.push([+value]);
    }
    console.log(subarrayNumberStack);
}
function computeValue(index){
    let result = 0;
    for (let i = index; i < subarrayNumberStack.length; i++){
        let subResult = 1; 
        for (let j = 0; j < subarrayNumberStack[i].length; j ++){
            subResult *= subarrayNumberStack[i][j];
        }
        result += subResult;
    }
    console.log(`computeValue ${result}`);
    return result;
}
//getTmpResultNumber when clicking on +-*/
function getTmpResultNumber(curOp){
    let tmpResultNumber;
    if (curOp === "*" || curOp === "/"){
        tmpResultNumber = computeValue(subarrayNumberStack.length - 1);
    }else if (curOp === "+" || curOp === "-"){
        tmpResultNumber = computeValue(0);
    }else{
        console.log("Error in get tmpResultNumber: curOp does not exist!");
    }
    console.log(`getTmpResultNumber ${tmpResultNumber}`);
    return tmpResultNumber;
}

//operator clicked: push previous number to subarrayNumberStack if subarrayNumberStack is empty or subarrayNumberStack top is an operator
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
        tmpResult = getTmpResultNumber(operatorButton.textContent);
        replaceScreenContent(tmpResult.toString());
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



