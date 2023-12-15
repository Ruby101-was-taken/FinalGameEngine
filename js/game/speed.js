import GameAnimationHandler from "../engine/animationHandler.js";
import PowerUp from "./powerUp.js";
import { SpeedImages } from "../engine/resources.js";
import GameAnimation from "../engine/animation.js";

class Speed extends PowerUp{
    constructor(x,y, width, height, color){
        super(x,y, width, height, color);
        this.tag = "speed";

        this.addComponent(new GameAnimationHandler(SpeedImages.f1));
        this.getComponent(GameAnimationHandler).animations[0] = new GameAnimation([SpeedImages.f1, SpeedImages.f2, SpeedImages.f3, SpeedImages.f4])
    }
    get(player){
        if(!this.collected){
            player.speed+=5;
            super.get();
        }
    }
}


export default Speed;