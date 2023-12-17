import GameObject from "../engine/gameobject.js";
import ParticleSystem from "../engine/particleSystem.js";
import Physics from "../engine/physics.js";
import UI from "../engine/ui.js";
import { AudioFiles } from "../engine/resources.js";
import GameSoundPlayer from "../engine/sound.js";


class GameManager extends GameObject{
    constructor(){
        super(0,0);
        this.stars = 0;
        this.addComponent(new GameSoundPlayer());
        this.getComponent(GameSoundPlayer).addSound("Star", AudioFiles.star);

    }
    getStar(star){
        if(!star.collected){
            this.stars+=1;
            star.collected = true
            this.spawnParticles();
            this.game.playerUI.fontSize = 100;
            this.getComponent(GameSoundPlayer).playSound("Star");
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

  update(deltaTime){

    if(this.stars >= 9 && !this.hasComponent(UI)){
        this.addComponent(new UI("YOU WIN", (this.game.canvas.width/2)-500, (this.game.canvas.height/2)-100, "200px Comic Sans MS", "yellow"))
        this.game.player.canMove = false;
    }

    super.update(deltaTime);
  }
}

export default GameManager;