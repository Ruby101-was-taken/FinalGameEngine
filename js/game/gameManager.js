import GameObject from "../engine/gameobject.js";
import ParticleSystem from "../engine/particleSystem.js";
import Physics from "../engine/physics.js";


class GameManager extends GameObject{
    constructor(){
        super(0,0);
        this.stars = 0;
    }
    getStar(star){
        if(!star.collected){
            this.stars+=1;
            star.collected = true
            this.spawnParticles();
        }
    }

    reset(){
        this.stars = 0;
    }

    
  spawnParticles(pos={x:0, y:0, w:0, h:0}, colour="yellow", physics = new Physics({x:0,y:0},{x:0,y:0},{x:0,y:50},{x:0,y:0}), count=3, lifeDur=1, emitDur=0.5, power=5) {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(pos.x+pos.w/2, pos.y+pos.h/2, colour, count, lifeDur, emitDur, physics, power);
    this.game.addGameObject(particleSystem);
  }
}

export default GameManager;