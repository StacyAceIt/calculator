export class Screen{
    constructor(){
        this.screen = document.getElementById("screen");
    }
    concatScreenContent(text){
        this.screen.textContent += text;
    }
    replaceScreenContent(text){
        this.screen.textContent = text;
    }
    reset(){
        this.screen.textContent = "0";
    }
    getContent(){
        return this.screen.textContent;
    }
    
}

