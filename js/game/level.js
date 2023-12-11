// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    // Create a player object and add it to the game
    const player = new Player(0, -70);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 100;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(-5000, -500, 5000, 520),
      new Platform(0, 0, 900, 20),
      new Platform(0, -150, 700, 20),
      new Platform(800, -40, 100, 60),
      new Platform(900, -300, 515, 319),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // // Create enemies and add them to the game
    // this.addGameObject(new Enemy(50, this.canvas.height - 90));
    // this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    // this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // // Create collectibles and add them to the game
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
