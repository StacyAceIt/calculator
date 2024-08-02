export class Screen{
    constructor(){
        this.screen = document.getElementById("screen");
    }
    concatScreenContent(text){
        this.setContent(this.adjustFontSize(this.getContent() + text));
    }
    replaceScreenContent(text){
        this.setContent(this.adjustFontSize(text));
    }
    reset(){
        this.screen.textContent = "0";
    }
    getContent(){
        return this.screen.textContent;
    }
    setContent(updatedText){
        this.screen.textContent = updatedText;
    }
    adjustFontSize(text){
        if (text.length > 10){
            this.screen.style.fontSize = "2rem";

        }
        return text;
    }
    
}

