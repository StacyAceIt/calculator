import { Screen } from './screen.js';

class Calculator{
    constructor(){      
        this.stack = [];
        this.isFloat = false;
        this.previousOperator = null;

        this.initClickEventListeners();
        this.screen = new Screen();        
        this.preButton = null;
        this.curButton = null;
        this.operatorSet = new Set(["+", "-", "*", "/", "="]);
    }
    initClickEventListeners(){
        const buttons = document.querySelectorAll(".button");
        buttons.forEach(button => {
            button.addEventListener("click", () =>{
                this.handleButtonClick(button);
            });
        });
        const numberButtons = document.querySelectorAll(".numberButton");
        numberButtons.forEach(numberButton => {
            numberButton.addEventListener("click", () => {                 
                this.handleNumberButtonClick(numberButton.textContent);
            });
        });
        
        const operatorButtons = document.querySelectorAll(".operatorButton");
        operatorButtons.forEach(operatorButton => {
            operatorButton.addEventListener("click", () =>{
                let tmpResult = this.getTmpResultNumber(operatorButton.textContent);
                this.screen.replaceScreenContent(tmpResult.toString());
                this.previousOperator = operatorButton.textContent;
                console.log(this.stack);
                console.log(`tmpResult ${tmpResult}`);
            });
        })
        const negateButton = document.querySelector(".\\+\\/\\-");
        negateButton.addEventListener("click", () => {
            let newValue = +this.screen.getContent() * -1;
            this.screen.replaceScreenContent(`${newValue}`);
        });
        const percentageButton = document.querySelector(".\\%");
        percentageButton.addEventListener("click", () => {
            let newValue = +this.screen.getContent() / 100;            
            this.screen.replaceScreenContent(`${newValue}`);
        });
    }
    handleButtonClick(button){
        this.preButton = this.curButton;
        this.curButton = button.textContent;
        this.highlightButton(button);
        //operator && operator
        if (this.preButton === "=" && this.isOperatorState(this.curButton)){
            this.enteringOperatorState();
        }//operator && number
        else if ((this.curButton === "AC")||(this.isOperatorState(this.preButton) && this.isNumberState(this.curButton))){
            //entering number state to computeStack
            this.enteringNumberState();
            //number && operator
        }else if (this.isNumberState(this.preButton) && this.isOperatorState(this.curButton)){
            //entering operator state to pushScreenText
            this.enteringOperatorState();
        }
    }
    //screen management: shared by all event listeners
    
    //support event listeners for operator
    //push previousValue after clicking a new operator
    isNumberState(buttonLabel){
        return !this.operatorSet.has(buttonLabel);
    }
    isOperatorState(buttonLabel){
        return this.operatorSet.has(buttonLabel);
    }
    enteringNumberState(){
        //this.screen.getContent is the previousValue
        this.computeStack(this.screen.getContent());
        //reset screen content to 0 after storing screen content
        this.screen.reset();
        this.isFloat = false;
        if (this.curButton == "AC"){
            console.log("AC");
            this.reset();
        }     
    }
    enteringOperatorState(){
        this.pushScreenText(this.screen.getContent(), this.previousOperator);  
    }
    pushScreenText(preText, preOp){
        switch (preOp){
            case "*":
                this.stack[this.stack.length - 1].push(+preText);
                break;
            case "/":
                this.stack[this.stack.length - 1].push(1/preText);
                break;
            case "-":
                this.stack.push([-preText]);
                break;
            case "=":
                this.stack = [];               
            default:
                console.log(`pushed ${+preText}`)
                this.stack.push([+preText]);
        }
        
    }
    //compute temporary value after clicking on operator
    computeTmpValue(index){
        let result = 0;
        for (let i = index; i < this.stack.length; i++){
            let subResult = 1; 
            for (let j = 0; j < this.stack[i].length; j ++){
                subResult *= this.stack[i][j];
            }
            result += subResult;
        }
        console.log(`computeTmpValue ${result} type ${typeof result}`);
        return result;
    }
    //getTmpResultNumber when clicking on +-*/
    getTmpResultNumber(curOp){
        switch (curOp){
            case "+":
            case "-":
            case "=":
                return this.computeTmpValue(0);
            case "*":
            case "/":
                return this.computeTmpValue(this.stack.length - 1);
            default:
                console.log("Error in get tmpResultNumber: curOp does not exist!");

        }
    }

    //support event listeners for numbers
    computeStack(newText){
        //if previousOperator is null, this is the first value, no change on this.stack
        switch (this.previousOperator){
            case "+":
            case "-":
                this.stack.splice(0, this.stack.length, [+newText]);
                break;
            case "*":
            case "/":
                this.stack.splice(this.stack.length - 1, 1, [+newText]);
                break;
            case "=":
                this.stack = [];
                this.previousOperator = null;
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
        const errorSound = new Audio('./audio/minecraft_click.mp3');
        if (this.isFloat) {
            errorSound.play();
        } else {
            this.screen.concatScreenContent(".");
            this.isFloat = true;
        }
    }
    handleNumber(text) {
        if (this.screen.getContent() === "0") {
            this.screen.replaceScreenContent(text);
        } else {
            this.screen.concatScreenContent(text);
        }
    }
    reset(){
        this.stack = [];
        this.previousOperator = null;
    }
    highlightButton(button) {
        // Remove highlight from any previously highlighted button
        const highlightedButton = document.querySelector(".button.highlight");
        if (highlightedButton) {
            highlightedButton.classList.remove("highlight");
        }
        // Add highlight to the clicked button
        button.classList.add("highlight");
    }

}

const calculator = new Calculator();
window.calculator = calculator;



