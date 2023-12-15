import Component from "./component.js";


class GameSoundPlayer extends Component{
    constructor(){
        super();
        this.sound = {};
    }

    addSound(name, path){
        this.sound[name] = path;
    }
    playSound(name){
       new Audio(this.sound[name].src).play();
    }
}

export default GameSoundPlayer;