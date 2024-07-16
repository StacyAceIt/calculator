const container = document.getElementById("container");
const buttons = document.getElementById("buttons");
const numOfRows = 4;
const numOfCols = 5;
const buttonLabels = ["7", "8", "9", "/", "AC", "4", "5", "6", "*", "+/-", "1", "2", "3", "-", "%", "skip", "0", ".", "+", "="];
const numberButtons = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]);
const operatorButtons = new Set(["+", "-", "*", "/", "="]);
const otherButtons = new Set(["AC", "+/-", "%"]);

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * 6);
    return `url('./img/${randomIndex}.png')`;
}
container.style.backgroundImage = getRandomImage();

function setBackgroundColor(button, label) {
    if (numberButtons.has(label)) {
        button.style.backgroundColor = "rgb(251, 111, 135)";
    } else if (operatorButtons.has(label)) {
        button.style.backgroundColor = "rgb(250, 160, 160)";
    } else {
        button.style.backgroundColor = "rgb(250, 128, 114)";
    }
}

function setButtonDimensions(button, label) {
    button.style.height = `${100 / numOfRows}%`;
    if (label === "0") {
        button.style.width = `${2 * 100 / numOfCols}%`;
    } else {
        button.style.width = `${100 / numOfCols}%`;
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

createButtons();
