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
        if (previousOperator){
            stack.push(previousOperator);
            previousOperator = "";
            console.log(stack);
            resetScreenToZero();
        }
        if (numberButton.textContent === "."){
            if (isFloat){
                errorSound.play(); 
            }else{
                concatScreenContent(numberButton.textContent);
                isFloat = true;
            }
        }else if (screen.textContent === "0"){
            replaceScreenContent(numberButton.textContent);
        }else{
            concatScreenContent(numberButton.textContent);
        }
    });
});
const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () =>{
        if (screen.textContent){
            previousOperator = operatorButton.textContent;
            stack.push(screen.textContent);
            console.log(stack);
        }
        
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



