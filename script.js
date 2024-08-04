import { Screen } from './screen.js';

class Calculator{
    constructor(){      
        this.stack = [];
        this.isFloat = false;
        this.previousOperator = null;

        this.initClickEventListeners();
        this.initKeydownEventListeners();
        this.screen = new Screen();        
        this.preButton = null;
        this.curButton = null;
        this.operatorButtonSet = new Set(["+", "-", "*", "/", "="]);
        this.numberButtonSet = new Set(["0","1", "2",
            "3", "4", "5", "6", "7", "8", "9", "."
        ]);
        this.keyboardButtonSet = new Set(["0","1", "2",
            "3", "4", "5", "6", "7", "8", "9", ".",
            "+", "-", "*", "/", "=", "Escape", "n", "%",
        ]);
    }
    initClickEventListeners(){
        const buttons = document.querySelectorAll(".button");
        buttons.forEach(button => {
            button.addEventListener("click", () =>{
                this.highlightButton(button);
                let buttonLabel = button.textContent;                
                this.handleButtonEvents(buttonLabel);
            });
        });
        
    }
    initKeydownEventListeners(){
        document.addEventListener("keydown", (event) => {
            if (this.keyboardButtonSet.has(event.key)){
                const keyMap = {
                    'n': '+/-',
                    'Escape': 'AC'
                };
                
                let buttonLabel = keyMap[event.key] || event.key; 
                //getElementsByClassName returns a collection of HTML elements
                const button = document.querySelector(`.button.${CSS.escape(buttonLabel)}`);
                //const button = document.getElementsByClassName(buttonLabel)[0];   
                if (button) {
                    this.highlightButton(button);                   
                }
                this.handleButtonEvents(buttonLabel);               
            }          
        });      
    }
    handleButtonEvents(buttonLabel){
        this.handleStack(buttonLabel);
        if (buttonLabel === "%"){
            this.handlePercentageButtonEvents();
        }else if (buttonLabel === "+/-"){
            this.handleNegateButtonEvents();
        }else if (this.operatorButtonSet.has(buttonLabel)){
            this.handleOperatorButtonEvents(buttonLabel);
        }else if (this.numberButtonSet.has(buttonLabel)){
            this.handleNumberButtonEvents(buttonLabel);
        }
    }
    //This method decides the equation is entering number state or operator state
    handleStack(buttonLabel){
        console.log("handleStack " + buttonLabel + " button clicked");
        this.preButton = this.curButton;
        this.curButton = buttonLabel;
        
        //operator && operator
        if (this.preButton === "=" && this.isOperatorState(this.curButton)){
            this.enteringOperatorState();
        }//operator && number. If curButton is AC, it doesn't matter what preButton is.
        else if ((this.curButton === "AC")||(this.isOperatorState(this.preButton) && this.isNumberState(this.curButton))){
            //entering number state to computeStack
            this.enteringNumberState();
            //number && operator
        }else if (this.isNumberState(this.preButton) && this.isOperatorState(this.curButton)){
            //entering operator state to pushScreenText
            this.enteringOperatorState();
        }
    }
    handleNumberButtonEvents(numberLabel) {
        if (numberLabel === ".") {
            this.handleDecimalPoint();
        } else {
            this.handleNumber(numberLabel);
        }
    }
    //This method decides what shows on the screen and updates the previousOperator
    handleOperatorButtonEvents(operatorLabel){
        let tmpResult = this.getTmpResultNumber(operatorLabel);
        this.screen.replaceScreenContent(tmpResult.toString());
        this.previousOperator = operatorLabel;
        // console.log(this.stack);
        // console.log(`tmpResult ${tmpResult}`);
    }
    handleNegateButtonEvents(){
        let newValue = +this.screen.getContent() * -1;
        this.screen.replaceScreenContent(`${newValue}`);
    }
    handlePercentageButtonEvents(){
        let newValue = +this.screen.getContent() / 100;            
        this.screen.replaceScreenContent(`${newValue}`);
    }
    //screen management: shared by all event listeners
    
    //support event listeners for operator
    //push previousValue after clicking a new operator
    isNumberState(buttonLabel){
        return !this.operatorButtonSet.has(buttonLabel);
    }
    isOperatorState(buttonLabel){
        return this.operatorButtonSet.has(buttonLabel);
    }
    enteringNumberState(){
        //this.screen.getContent is the previousValue
        this.computeStack(this.screen.getContent());
        //reset screen content to 0 after storing screen content
        if (!(this.preButton === "=" && (this.curButton === "%" 
                                    || this.curButton === "+/-"))){
            this.screen.reset();
        }
        
        this.isFloat = false;
        if (this.curButton == "AC"){
            this.reset();
        }     
    }
    enteringOperatorState(){
        this.pushScreenText(this.screen.getContent(), this.previousOperator);  
    }
    pushScreenText(preText, preOp){
        console.log("preText: " + preText + "preOp: " + preOp)
        switch (preOp){
            case "*":
                this.stack[this.stack.length - 1].push(+preText);
                break;
            case "/":
                if (+preText === 0){
                    this.stack[this.stack.length - 1].push(NaN);
                }else{
                    this.stack[this.stack.length - 1].push(1/preText);
                }
                
                break;
            case "-":
                this.stack.push([-preText]);
                break;
            case "=":
                // this.stack = [];
                this.reset();
                console.log("reset stack " + this.stack);               
            default:
                // console.log(`pushed ${+preText}`)
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
                // this.stack = [];
                // this.previousOperator = null;
                this.reset();
                break;
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



