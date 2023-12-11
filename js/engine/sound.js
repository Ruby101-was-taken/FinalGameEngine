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
        this.sound[name].play();
    }
}

export default GameSoundPlayer;