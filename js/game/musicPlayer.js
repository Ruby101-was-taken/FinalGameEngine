import GameObject from "../engine/gameobject.js";
import GameSoundPlayer from "../engine/sound.js";
import { Music } from "../engine/resources.js";


class MusicPlayer extends GameObject{
    constructor(){
        super(0,0);
        this.addComponent(new GameSoundPlayer());
        this.getComponent(GameSoundPlayer).addSound("intro", Music.intro);
        this.getComponent(GameSoundPlayer).addSound("loop", Music.loop);
        this.getComponent(GameSoundPlayer).playSound("intro");

        this.hasPlayedIntro = false;

        setTimeout (() => {
            this.getComponent(GameSoundPlayer).playSoundUntilDone("loop");
            this.hasPlayedIntro = true;
        }, 7800)
    }

    update(deltaTime){

        if(this.hasPlayedIntro){
            this.getComponent(GameSoundPlayer).playSoundUntilDone("loop");
        }

        super.update(deltaTime);
    }
}

export default MusicPlayer;
