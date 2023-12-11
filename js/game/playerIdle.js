import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import { PlayerImages } from "../engine/resources.js";
import GameAnimation from '../engine/animation.js';
import GameAnimationHandler from '../engine/animationHandler.js';



class PlayerIdle extends GameObject{
    constructor(player){
        super(player.x, player.y);
        this.addComponent(new Renderer('blue', 46, 46, PlayerImages.wait2, {x:-20, y:25})); // Add renderer
        this.addComponent(new GameAnimationHandler(PlayerImages.wait2));
        this.getComponent(GameAnimationHandler).animations[0] = new GameAnimation([PlayerImages.wait2, PlayerImages.wait3], 1)
    }
}

export default PlayerIdle;