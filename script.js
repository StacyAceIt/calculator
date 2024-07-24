class Calculator{
    constructor(){
        this.screen = document.getElementById("screen");       
        this.stack = [];
        this.isNumberState = true;
        this.isFloat = false;
        this.previousOperator = null;
        this.previousText = "";
        this.initEventListeners();
    }
    initEventListeners(){
        const numberButtons = document.querySelectorAll(".numberButton");
        numberButtons.forEach(numberButton => {
            numberButton.addEventListener("click", () => {
                //first click on a number button, process stack
                if (!this.isNumberState) {
                    //screen.textContent is the previousValue
                    this.computePreviousValues(this.previousText);
                    //reset screen content to 0 after storing screen content
                    this.resetScreenToZero();
                    this.isNumberState = true;
                    this.isFloat = false;            
                }
                this.handleNumberButtonClick(numberButton.textContent);
        
            });
        });
        
        const operatorButtons = document.querySelectorAll(".operatorButton");
        operatorButtons.forEach(operatorButton => {
            operatorButton.addEventListener("click", () =>{
                if (this.isNumberState){
                    
                    this.previousText = this.screen.textContent;
                    console.log(`number state: ${this.previousText}`);
                    this.pushPreviousText(this.previousText, this.previousOperator);            
                    //can't push again after pushing number     
                    this.isNumberState = false;
                }
                let tmpResult = this.getTmpResultNumber(operatorButton.textContent);
                this.replaceScreenContent(tmpResult.toString());
                this.previousOperator = operatorButton.textContent;
                console.log(this.stack);
                console.log(`tmpResult ${tmpResult}`);
            });
        })
        const negateButton = document.querySelector(".\\+\\/\\-");
        negateButton.addEventListener("click", () => {
            let newValue = +this.screen.textContent * -1;
            this.isFloat = (!Number.isInteger(newValue)) ? true : false;
            this.replaceScreenContent(`${newValue}`);
        });
        const percentageButton = document.querySelector(".\\%");
        percentageButton.addEventListener("click", () => {
            let newValue = +this.screen.textContent / 100;
            this.isFloat = (!Number.isInteger(newValue)) ? true : false;
            this.replaceScreenContent(`${newValue}`);
        });
    }
    //screen management: shared by all event listeners
    concatScreenContent(text){
        this.screen.textContent += text;
    }
    replaceScreenContent(text){
        this.screen.textContent = text;
    }
    resetScreenToZero(){
        this.screen.textContent = "0";
    }
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
                this.stack.push([+preText]);
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
        console.log(`computeValue ${result}`);
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
    computePreviousValues(newText){
        //if previousOperator is null, this is the first value, no change on this.stack
        switch (this.previousOperator){
            case "+":
            case "-":
            case "=":
                this.stack.splice(0, this.stack.length, [newText]);
                break;
            case "*":
            case "/":
                this.stack.splice(this.stack.length - 1, 1, [newText]);
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
            this.concatScreenContent(".");
            this.isFloat = true;
        }
    }
    handleNumber(text) {
        if (this.screen.textContent === "0") {
            this.replaceScreenContent(text);
        } else {
            this.concatScreenContent(text);
        }
    }

}

const calculator = new Calculator();




