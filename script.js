const screen = document.getElementById("screen");
let isFloat = false;
let previousOperator = "";
let stack = [];

function updateScreen(text){
    screen.textContent += text;
}
function resetScreen(text){
    screen.textContent = text;
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
            resetScreen(numberButton.textContent);
        }
        if (numberButton.textContent === "."){
            if (isFloat){
                errorSound.play(); 
            }else{
                updateScreen(numberButton.textContent);
                isFloat = true;
            }
        }else if (screen.textContent === "0"){
            resetScreen(numberButton.textContent);
        }else{
            updateScreen(numberButton.textContent);
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
    resetScreen(`${newValue}`);
});

const percentageButton = document.querySelector(".\\%");
percentageButton.addEventListener("click", () => {
    let newValue = +screen.textContent / 100;
    isFloat = (!Number.isInteger(newValue)) ? true : false;
    resetScreen(`${newValue}`);
});



