import Component from "./component.js";
import Renderer from "./renderer.js";
import GameAnimation from "./animation.js";


class GameAnimationHandler extends Component{
    constructor(defaultImage){
        super();
        this.animations = [new GameAnimation([defaultImage])];
        this.currentAnimation = 0;
        this.bonusNum = 0;
    }
    
    addAnimation(animation){
        this.animations.push(animation);
    }

    update(deltaTime){
        this.gameObject.getComponent(Renderer).image = this.animations[this.currentAnimation].updateAnimation(deltaTime, this.bonusNum);
    }
}


export default GameAnimationHandler;
