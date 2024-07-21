const CalculatorUI = {
    numOfRows: 4,
    numOfCols: 5,
    buttonLabels: ["7", "8", "9", "/", "AC", "4", "5", "6", "*", "+/-", "1", "2", "3", "-", "%", "skip", "0", ".", "+", "="],
    numberButtonsSet: new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]),
    operatorButtonsSet: new Set(["+", "-", "*", "/", "="]),
    buttonsContainer: document.getElementById("buttons"),
    image: document.getElementById("image"),

    getRandomImage() {
        const randomIndex = Math.floor(Math.random() * 6);
        return `url('./img/${randomIndex}.png')`;
    },

    setButtonDimensions(button, label) {
        button.style.height = `${100 / this.numOfRows}%`;
        if (label === "0") {
            button.style.width = `${2 * 100 / this.numOfCols}%`;
        } else {
            button.style.width = `${100 / this.numOfCols}%`;
        }
    },

    setBackgroundColor(button, label) {
        if (this.numberButtonsSet.has(label)) {
            button.style.backgroundColor = "rgb(251, 111, 135)";
            button.classList.add("numberButton");
        } else if (this.operatorButtonsSet.has(label)) {
            button.style.backgroundColor = "rgb(250, 160, 160)";
            button.classList.add("operatorButton");
        } else {
            button.style.backgroundColor = "rgb(250, 128, 114)";
        }
    },

    createButtons() {
        let count = 0;
        for (let r = 0; r < this.numOfRows; r++) {
            for (let c = 0; c < this.numOfCols; c++) {
                if (this.buttonLabels[count] !== "skip") {
                    let div = document.createElement("div");
                    div.classList.add("button");
                    div.classList.add(this.buttonLabels[count]);
                    div.textContent = this.buttonLabels[count];

                    this.setBackgroundColor(div, this.buttonLabels[count]);
                    this.setButtonDimensions(div, this.buttonLabels[count]);

                    this.buttonsContainer.appendChild(div);
                }
                count++;
            }
        }
    },

    init() {
        this.image.style.backgroundImage = this.getRandomImage();
        this.createButtons();
    }
};

// Initialize the UI
CalculatorUI.init();
