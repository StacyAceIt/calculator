class Calculator{
    constructor(){
        this.stack = [];
        this.isNumberState = true;
        this.isFloat = false;
        this.previousOperator = null;
        this.previousValue = "";
        this.errorSound = new Audio('./audio/minecraft_click.mp3');
    }
    //screen management: shared by all event listeners
    concatScreenContent(text){
        screen.textContent += text;
    }
    replaceScreenContent(text){
        screen.textContent = text;
    }
    resetScreenToZero(){
        screen.textContent = "0";
    }
    //support event listeners for operator
    //push previousValue after clicking a new operator
    pushPreviousValue(value, preOp){
        switch (preOp){
            case "*":
                this.stack[this.stack.length - 1].push(+value);
                break;
            case "/":
                this.stack[this.stack.length - 1].push(1/value);
                break;
            case "-":
                this.stack.push([-value]);
                break;
            default:
                this.stack.push([+value]);
        }
        
    }
    //compute temporary value after clicking on operator
    computeValue(index){
        let result = 0;
        for (let i = index; i < this.stack.length; i++){
            let subResult = 1; 
            for (let j = 0; j < this.stack[i].length; j ++){
                subResult *= this.stack[i][j];
            }
            result += subResult;
        }
        // console.log(`computeValue ${result}`);
        return result;
    }
    //getTmpResultNumber when clicking on +-*/
    getTmpResultNumber(curOp){
        switch (curOp){
            case "+":
            case "-":
            case "=":
                return this.computeValue(0);
            case "*":
            case "/":
                return this.computeValue(this.stack.length - 1);
            default:
                console.log("Error in get tmpResultNumber: curOp does not exist!");

        }
    }

    //support event listeners for numbers
    handleStack(newValue){
        //if previousOperator is null, this is the first value, no change on calculator.stack
        switch (this.previousOperator){
            case "+":
            case "-":
            case "=":
                this.stack.splice(0, this.stack.length, [newValue]);
                break;
            case "*":
            case "/":
                this.stack.splice(this.stack.length - 1, 1, [newValue]);
                break;
        }

    }
    handleNumberButtonClick(text) {
        if (text === ".") {
            this.handleDecimalPoint();
        } else {
            this.handleNumber(text);
        }
    }
    handleDecimalPoint() {
        if (this.isFloat) {
            errorSound.play();
        } else {
            this.concatScreenContent(".");
            this.isFloat = true;
        }
    }
    handleNumber(text) {
        if (screen.textContent === "0") {
            this.replaceScreenContent(text);
        } else {
            this.concatScreenContent(text);
        }
    }

}
const calculator = new Calculator();
const screen = document.getElementById("screen");
const numberButtons = document.querySelectorAll(".numberButton");
const operatorButtons = document.querySelectorAll(".operatorButton");
const negateButton = document.querySelector(".\\+\\/\\-");
const percentageButton = document.querySelector(".\\%");

//stack stores subarrays of numbers

//event listeners
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        //first click on a number button, process stack
        if (!calculator.isNumberState) {
            handleStack(+screen.textContent);
            //reset screen content to 0 after storing screen content
            resetScreenToZero();
            calculator.isNumberState = true;
            calculator.isFloat = false;            
        }
        handleNumberButtonClick(numberButton.textContent);

    });
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () =>{
        if (calculator.isNumberState){
            previousValue = screen.textContent;
            pushPreviousValue(previousValue, calculator.previousOperator);            
            //can't push again after pushing number     
            calculator.isNumberState = false;
        }
        let tmpResult = getTmpResultNumber(operatorButton.textContent);
        replaceScreenContent(tmpResult.toString());
        calculator.previousOperator = operatorButton.textContent;

    });
})

negateButton.addEventListener("click", () => {
    let newValue = +screen.textContent * -1;
    calculator.isFloat = (!Number.isInteger(newValue)) ? true : false;
    replaceScreenContent(`${newValue}`);
});

percentageButton.addEventListener("click", () => {
    let newValue = +screen.textContent / 100;
    calculator.isFloat = (!Number.isInteger(newValue)) ? true : false;
    replaceScreenContent(`${newValue}`);
});

