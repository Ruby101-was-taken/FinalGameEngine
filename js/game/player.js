// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import GameAnimationHandler from '../engine/animationHandler.js';
import { PlayerImages, AudioFiles } from '../engine/resources.js';
import GameAnimation from '../engine/animation.js';
import GameSoundPlayer from '../engine/sound.js';
import PlayerIdle from './playerIdle.js';
import Star from './star.js';
import Speed from './speed.js';


// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 46, 46, PlayerImages.idle, {x:0, y:1}); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, {x: 9, y:0})); // Add physics
    this.getComponent(Physics).setBoundingSize(20, 40)
    this.addComponent(new Input()); // Add input for handling user input

    this.addComponent(new GameAnimationHandler(PlayerImages.idle));
    this.getComponent(GameAnimationHandler).animations[0] = new GameAnimation([PlayerImages.idle, PlayerImages.idle, PlayerImages.idle, PlayerImages.idle, PlayerImages.idle, PlayerImages.idle, PlayerImages.idle, PlayerImages.idle, PlayerImages.idle1])
    this.getComponent(GameAnimationHandler).addAnimation(new GameAnimation([PlayerImages.walk1, PlayerImages.walk3, PlayerImages.walk2,PlayerImages.walk3]));
    this.getComponent(GameAnimationHandler).addAnimation(new GameAnimation([PlayerImages.skid]));
    this.getComponent(GameAnimationHandler).addAnimation(new GameAnimation([PlayerImages.jump]));
    this.getComponent(GameAnimationHandler).addAnimation(new GameAnimation([PlayerImages.fall]));
    this.getComponent(GameAnimationHandler).addAnimation(new GameAnimation([PlayerImages.wait1, PlayerImages.wait1, PlayerImages.wait1, PlayerImages.wait1, PlayerImages.wait1, PlayerImages.wait1, PlayerImages.wait1, PlayerImages.wait1, PlayerImages.wait4]));

    this.addComponent(new GameSoundPlayer());
    this.getComponent(GameSoundPlayer).addSound("Jump", AudioFiles.jump);
    
    // Initialize all the player specific properties
    this.direction = -1;
    this.directionY = 1;
    this.lives = 3;
    this.score = 0;
    this.wasGrounded = true;
    this.isJumping = false;
    this.jumpForce = 20;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;

    this.canFlip = true;

    this.dashSpeed = 20;

    this.jumpHeld = false;
    this.jumpHeldCounter = 0;
    this.ctrlHeld = false;

    this.cTime = 0;

    this.waitTimer = 0;
    this.idleAnim = new PlayerIdle(this);
    this.addedIdleAnim = false;

    this.defaultSpeed = 15;
    this.speed = this.defaultSpeed;
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    if(!this.addedIdleAnim){
      this.game.addGameObject(this.idleAnim);
      this.addedIdleAnim = true;
      this.idleAnim.getComponent(Renderer).show = false;
    }

    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    this.waitTimer+=deltaTime;
    
    // Handle player movement
    if (!this.isGamepadMovement && (input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD')) && physics.velocity.x<5 && !(input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA'))) {
      physics.acceleration.x = this.speed;
      this.direction = -1;
      this.waitTimer = 0;
    } if (!this.isGamepadMovement && (input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA')) && physics.velocity.x>-5 && !(input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD'))) {
      physics.acceleration.x = -this.speed;
      this.direction = 1;
      this.waitTimer = 0;
    }  


    if(this.ctrlHeld){
      this.ctrlHeld = input.isKeyDown("ControlLeft");
    }
    if(!this.canFlip){
      this.canFlip = physics.isGrounded;
    }

    if(input.isKeyDown('ControlLeft') && !this.ctrlHeld && this.canFlip){
      this.ctrlHeld = true;
      this.gravFlip();
    }

    //coyote time implementation
    if(physics.isGrounded){
      this.cTime = 0.35;
    }
    else if(this.cTime > 0){
      this.cTime-=deltaTime*2;
    }
    else if(this.cTime <0){
      this.cTime = 0;
    }


    if(this.jumpHeld){
      this.jumpHeld = input.isKeyDown("Space");
    }

    // Handle player jumping
    if (!this.isGamepadJump && input.isKeyDown('Space') && !this.jumpHeld) {
      this.startJump();
      this.jumpHeld = true;
      this.waitTimer = 0;
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const stars = this.game.gameObjects.filter((obj) => obj instanceof Star);
    for (const star of stars) {
      if (physics.isColliding(star.getComponent(Physics))) {
        this.game.gameManager.getStar(star);
      }
    }
    // Handle collisions with speed power ups
    const speedPU = this.game.gameObjects.filter((obj) => obj instanceof Speed);
    for (const speed of speedPU) {
      if (physics.isColliding(speed.getComponent(Physics))) {
        speed.get(this);
        
      }
    }

    for(const obj of physics.collidedObjects){
      if(obj.tag=="bad"){
        this.resetGame();
      }
      if(obj.tag=="flipper" && physics.isGrounded){
        this.gravFlip();
      }
    }
  
    

    // // Check if player has no lives left
    // if (this.lives <= 0) {
    //   location.reload();
    // }

    // Check if player has collected all collectibles
    // if (this.score >= 3) {
    //   console.log('You win!');

    // }

    const anim = this.getComponent(GameAnimationHandler)
    this.idleAnim.getComponent(Renderer).show = false;
    if(physics.velocity.y==0){
      if(physics.velocity.x != 0 && Math.sign(physics.velocity.x)!=this.direction){
        anim.currentAnimation = 1;
        anim.bonusNum = Math.abs(physics.velocity.x)/25;
      }
      else if(physics.velocity.x != 0 && Math.sign(physics.velocity.x)==this.direction){
        anim.currentAnimation = 2;
      }
      else{
        anim.bonusNum = 0;
        if(this.waitTimer < 5){
          anim.currentAnimation = 0;
        }
        else {
          this.idleAnim.x = this.x;
          this.idleAnim.y = this.y;
          this.idleAnim.getComponent(Renderer).show = true;
          anim.currentAnimation = 5;
        }
      }
    }
    else if(physics.velocity.y<0){
      if(physics.gravity.y > 0){
        anim.currentAnimation = 3;
      }
      else{
        anim.currentAnimation = 4;
      }
    }
    else if(physics.velocity.y>0){
      if(physics.gravity.y > 0){
        anim.currentAnimation = 4;
      }
      else{
        anim.currentAnimation = 3;
      }
    }

    this.wasGrounded = physics.isGrounded;

    super.update(deltaTime);

    if(physics.isGrounded && !this.wasGrounded){
      this.groundParticles();
    }
  }

  groundParticles(){
    this.game.gameManager.spawnParticles({x:this.x, y:this.y+23, w:this.w, h:0}, "white", new Physics({x:0,y:-Math.sign(this.getComponent(Physics).gravity.y)/1000}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}), 1, 0.5);
  } 

  draw(ctx){
    const renderer = this.getComponent(Renderer);
    if(!this.canFlip){
        renderer.addEffect("saturate", 30)
    }
    else{
      renderer.addEffect("saturate", 100)
    }
    super.draw(ctx);
  }

  changeSpeed(by){
    this.speed+=by;
  }

  gravFlip(){
    this.getComponent(Physics).gravity.y *= -1;
    this.directionY *= -1;
    this.idleAnim.directionY = this.directionY;
    this.waitTimer = 0;
    this.canFlip = false;
  }

  startJump() {
    // Initiate a jump if the player is on a platfor
    if (this.getComponent(Physics).isGrounded || this.cTime>0) {
      this.groundParticles();
      this.getComponent(GameSoundPlayer).playSound("Jump");
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce*Math.sign(this.getComponent(Physics).gravity.y);
      this.isOnPlatform = false;
      this.cTime = 0;
    }
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    console.log(`Score: ${this.score}`);
    this.game.gameManager.emitParticles(collectible);
  }


  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = 0 ;
    this.y = -70;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.getComponent(Physics).gravity = { x: 0, y: Math.abs(this.getComponent(Physics).gravity.y) };
    this.direction = -1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
    this.direction = 1;
    this.directionY = 1;
    this.idleAnim.directionY = 1;
    this.speed = this.defaultSpeed;
    this.game.reset();
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }

  
}

export default Player;
