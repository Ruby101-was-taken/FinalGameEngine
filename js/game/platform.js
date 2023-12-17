// Import the necessary classes from the 'engine' directory
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { TerrainTextures } from '../engine/resources.js';
import GeneralFunctions from '../engine/generalFunctions.js';
import GameAnimationHandler from '../engine/animationHandler.js';
import GameAnimation from '../engine/animation.js';

// Define a new class, Platform, which extends (inherits from) GameObject
class Platform extends GameObject {
  
  // Define the constructor for the Platform class. It takes arguments for the x and y coordinates,
  // width, height, and color (with a default value of 'gray' if no color is provided)
  constructor(x, y, width, height, color = 'gray', tag = "platform") {
    
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    
    // Add a Renderer component to this platform with the specified color, width, and height.
    // The Renderer component is responsible for rendering the platform on the canvas
    this.addComponent(new Renderer(color, width, height));
    
    // Add a Physics component to this platform, with initial velocity, acceleration, and forces set to zero.
    // Since platforms don't move, these values will remain zero throughout the game
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, {x:0, y:0}, true));
    
    // Set the tag property to 'platform'. This can be used to identify platforms later in the game logic
    this.tag = tag; 

    if(this.tag == "bad"){
      this.addComponent(new GameAnimationHandler(TerrainTextures.lava1));
      this.getComponent(GameAnimationHandler).animations[0] = new GameAnimation([TerrainTextures.lava1, TerrainTextures.lava2, TerrainTextures.lava3], 10);
    }
    else if(this.tag =="platform"){
      if(width==100 && height == 100){this.getComponent(Renderer).image = TerrainTextures[`p1`]}
      else{this.getComponent(Renderer).image = TerrainTextures[`p${new GeneralFunctions().genrateRandomNumber(2,8)}`]}
    }
  }
}

// Export the Platform class as the default export of this module
export default Platform;
