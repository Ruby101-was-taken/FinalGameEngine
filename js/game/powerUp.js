import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import { AudioFiles } from "../engine/resources.js";
import GameSoundPlayer from '../engine/sound.js';

class PowerUp extends GameObject{
    constructor(x,y, width, height, color){
        super(x, y);
        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, {x: 0, y:0}));
        this.collected = false;
        this.addComponent(new GameSoundPlayer());
        this.getComponent(GameSoundPlayer).addSound("Speed", AudioFiles.speedUp);
    }

    get(){
        this.collected = true;
        this.game.gameManager.spawnParticles(this, "white", new Physics({x:5,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:50}));
        this.getComponent(GameSoundPlayer).playSound("Speed");
    }

    reset(){
        this.collected = false;
    }
    
  draw(ctx){
    if(!this.collected){
        super.draw(ctx);
    }
  }
}

export default PowerUp;