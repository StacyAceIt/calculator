import { Screen } from './screen.js';

class Calculator{
    constructor(){      
        this.stack = [];
        this.isNumberState = true;
        this.isFloat = false;
        this.previousOperator = null;

        this.initEventListeners();
        this.screen = new Screen();        
        // this.preButton = null;
        // this.curButton = null;
    }
    initEventListeners(){
        // const buttons = document.querySelectorAll(".button");
        // buttons.forEach(button => {
        //     button.addEventListener("click", () =>{
        //         this.preButton = this.curButton;
        //         this.curButton = button.textContent;
        //     });
        // });
        const numberButtons = document.querySelectorAll(".numberButton");
        numberButtons.forEach(numberButton => {
            numberButton.addEventListener("click", () => {
                //first click on a number button, process stack
                if (this.previousOperator === "="){
                    this.reset();
                }
                else if (!this.isNumberState) {
                    //this.screen.getContent is the previousValue
                    this.computeStack(this.screen.getContent());
                    //reset screen content to 0 after storing screen content
                    this.screen.reset();
                    this.isNumberState = true;
                    this.isFloat = false;            
                }
                this.handleNumberButtonClick(numberButton.textContent);
                console.log(`numberButton ${numberButton.textContent}`)
            });
        });
        
        const operatorButtons = document.querySelectorAll(".operatorButton");
        operatorButtons.forEach(operatorButton => {
            operatorButton.addEventListener("click", () =>{
                if (this.isNumberState){  //can push value if previous input is not an operator                
                    let previousText = this.screen.getContent();
                    console.log(`number state: ${previousText}`);
                    this.pushPreviousText(previousText, this.previousOperator);            
                    //can't push again after pushing number     
                    this.isNumberState = false;
                }
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
    //screen management: shared by all event listeners
    
    //support event listeners for operator
    //push previousValue after clicking a new operator
    pushPreviousText(preText, preOp){
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
            case "=":
                this.stack.splice(0, this.stack.length, [+newText]);
                break;
            case "*":
            case "/":
                this.stack.splice(this.stack.length - 1, 1, [+newText]);
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
        this.isNumberState = true;
        this.isFloat = false;
        this.previousOperator = null;
        this.screen.reset();
    }

}

const calculator = new Calculator();




