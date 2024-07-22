const screen = document.getElementById("screen");
const errorSound = new Audio('./audio/minecraft_click.mp3');
const numberButtons = document.querySelectorAll(".numberButton");
const operatorButtons = document.querySelectorAll(".operatorButton");
const negateButton = document.querySelector(".\\+\\/\\-");
const percentageButton = document.querySelector(".\\%");
let isNumberState = true;
let isFloat = false;
let previousOperator = null;
let previousValue = screen.textContent;
//stack stores subarrays of numbers
let stack = [];

//screen management: shared by all event listeners
function concatScreenContent(text){
    screen.textContent += text;
}
function replaceScreenContent(text){
    screen.textContent = text;
}
function resetScreenToZero(){
    screen.textContent = "0";
}
//support event listeners for operator
//push previousValue after clicking a new operator
function pushPreviousValue(value, previousOperator){
    switch (previousOperator){
        case "*":
            stack[stack.length - 1].push(+value);
            break;
        case "/":
            stack[stack.length - 1].push(1/value);
            break;
        case "-":
            stack.push([-value]);
            break;
        default:
            stack.push([+value]);
    }
    
}
//compute temporary value after clicking on operator
function computeValue(index){
    let result = 0;
    for (let i = index; i < stack.length; i++){
        let subResult = 1; 
        for (let j = 0; j < stack[i].length; j ++){
            subResult *= stack[i][j];
        }
        result += subResult;
    }
    // console.log(`computeValue ${result}`);
    return result;
}
//getTmpResultNumber when clicking on +-*/
function getTmpResultNumber(curOp){
    switch (curOp){
        case "+":
        case "-":
        case "=":
            return computeValue(0);
        case "*":
        case "/":
            return computeValue(stack.length - 1);
        default:
            console.log("Error in get tmpResultNumber: curOp does not exist!");

    }
}

//support event listeners for numbers
function handleStack(newValue){
    //if previousOperator is null, this is the first value, no change on stack
    switch (previousOperator){
        case "+":
        case "-":
        case "=":
            stack.splice(0, stack.length, [newValue]);
            break;
        case "*":
        case "/":
            stack.splice(stack.length - 1, 1, [newValue]);
            break;
    }

}
function handleNumberButtonClick(text) {
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


//event listeners
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        //first click on a number button, process stack
        if (!isNumberState) {
            handleStack(+screen.textContent);
            //reset screen content to 0 after storing screen content
            resetScreenToZero();
            isNumberState = true;
            isFloat = false;            
        }
        handleNumberButtonClick(numberButton.textContent);

    });
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () =>{
        if (isNumberState){
            previousValue = screen.textContent;
            pushPreviousValue(previousValue, previousOperator);            
            //can't push again after pushing number     
            isNumberState = false;
        }
        let tmpResult = getTmpResultNumber(operatorButton.textContent);
        replaceScreenContent(tmpResult.toString());
        previousOperator = operatorButton.textContent;

    });
})

negateButton.addEventListener("click", () => {
    let newValue = +screen.textContent * -1;
    isFloat = (!Number.isInteger(newValue)) ? true : false;
    replaceScreenContent(`${newValue}`);
});

percentageButton.addEventListener("click", () => {
    let newValue = +screen.textContent / 100;
    isFloat = (!Number.isInteger(newValue)) ? true : false;
    replaceScreenContent(`${newValue}`);
});

