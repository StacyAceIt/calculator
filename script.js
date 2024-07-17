const image = document.getElementById("image");
const buttons = document.getElementById("buttons");
const screen = document.getElementById("screen");
const numOfRows = 4;
const numOfCols = 5;
const buttonLabels = ["7", "8", "9", "/", "AC", "4", "5", "6", "*", "+/-", "1", "2", "3", "-", "%", "skip", "0", ".", "+", "="];
const numberButtonsSet = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]);
const operatorButtonsSet = new Set(["+", "-", "*", "/", "="]);

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * 6);
    return `url('./img/${randomIndex}.png')`;
}

function setButtonDimensions(button, label) {
    button.style.height = `${100 / numOfRows}%`;
    if (label === "0") {
        button.style.width = `${2 * 100 / numOfCols}%`;
    } else {
        button.style.width = `${100 / numOfCols}%`;
    }
}

function setBackgroundColor(button, label) {
    if (numberButtonsSet.has(label)) {
        button.style.backgroundColor = "rgb(251, 111, 135)";
        button.classList.add("numberButton");
    } else if (operatorButtonsSet.has(label)) {
        button.style.backgroundColor = "rgb(250, 160, 160)";
        button.classList.add("operatorButton");
    } else {
        button.style.backgroundColor = "rgb(250, 128, 114)";
    }
}

function createButtons() {
    let count = 0;
    for (let r = 0; r < numOfRows; r++) {
        for (let c = 0; c < numOfCols; c++) {
            if (buttonLabels[count] !== "skip") {
                let div = document.createElement("div");
                div.classList.add("button");
                div.classList.add(buttonLabels[count]);
                div.textContent = buttonLabels[count];

                setBackgroundColor(div, buttonLabels[count]);
                setButtonDimensions(div, buttonLabels[count]);

                buttons.appendChild(div);
            }
            count++;
        }
    }
}
image.style.backgroundImage = getRandomImage();
createButtons();

// negate the displayed value
const negateButton = document.querySelector(".\\+\\/\\-");
negateButton.addEventListener("click", () => {
    screen.textContent = `${+screen.textContent * -1}`;
});

const numberButtons = document.querySelectorAll(".numberButton");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        // let currentValue = +screen.textContent;
        if (screen.textContent.slice(-1) === "." || 
        +screen.textContent !== 0 || 
        numberButton.textContent === "."){
            screen.textContent += numberButton.textContent;
        } else{
            screen.textContent = numberButton.textContent;
        }
    });
});