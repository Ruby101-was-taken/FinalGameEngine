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
    playSoundUntilDone(name){  //only plays sound once until over, will not let sound overlap
        this.sound[name].play();
    }
}

export default GameSoundPlayer;