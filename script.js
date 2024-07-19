const screen = document.getElementById("screen");
let isFloat = false;

function updateScreen(text){
    screen.textContent += text;
}
function resetScreen(text){
    screen.textContent = text;
}

const errorSound = new Audio('./audio/minecraft_click.mp3');
const numberButtons = document.querySelectorAll(".numberButton");
//ensure numbers are displayed properly
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
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



