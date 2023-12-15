import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";

class PowerUp extends GameObject{
    constructor(x,y, width, height, color){
        super(x, y);
        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, {x: 0, y:0}));
        this.collected = false;
    }

    get(){
        this.collected = true;
        this.game.gameManager.spawnParticles(this, "white", new Physics({x:5,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:50}));
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