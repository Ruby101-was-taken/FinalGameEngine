// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Star from './star.js';
import Renderer from '../engine/renderer.js';
import GameManager from './gameManager.js';
import Speed from './speed.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    


    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 100;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(1615.0, -216.0, 413.0, 64.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3744.0, -488.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4121.0, -644.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3944.0, -636.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1953.0, -799.0, 890.0, 379.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3338.0, -585.0, 506.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3287.0, -304.0, 369.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1202.0, -1150.0, 1684.0, 92.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1.0, -860.0, 1339.0, 400.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1316.0, -792.0, 321.0, 332.0, "rgb(128, 128, 128)", "platform"),
      new Platform(0.0, -460.0, 689.0, 367.0, "rgb(128, 128, 128)", "platform"),
      new Platform(-4997.0, -502.0, 5000.0, 1020.0, "rgb(128, 128, 128)", "platform"),
      new Platform(0.0, 0.0, 900.0, 500.0, "rgb(128, 128, 128)", "platform"),
      new Platform(900.0, -300.0, 719.0, 812.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2470.0, -152.0, 145.0, 29.0, "rgb(255, 0, 0)", "bad"),
      new Platform(2383.0, -207.0, 87.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2383.0, -12.0, 87.0, 162.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4238.0, -299.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4545.0, -800.0, 798.0, 275.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4545.0, -297.0, 798.0, 549.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5543.0, -525.0, 615.0, 228.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5343.0, -122.0, 649.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4882.0, -408.5, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(4839.0, -341.5, 138.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5343.0, -800.0, 1089.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2896.0, -202.5, 165.0, 33.0, "rgb(255, 0, 0)", "bad"),
      new Platform(3048.0, -268.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2615.0, -167.0, 108.0, 231.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1949.0, -300.0, 950.0, 148.0, "rgb(128, 128, 128)", "platform"),
      new Platform(6156.0, -525.0, 273.0, 981.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5576.0, 188.0, 852.0, 1061.5, "rgb(128, 128, 128)", "platform"),
      new Platform(5358.0, 492.5, 238.0, 123.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5122.0, 777.5, 296.0, 115.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5109.0, 1142.5, 628.0, 107.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4896.0, 500.5, 262.0, 749.5, "rgb(128, 128, 128)", "platform"),
      new Platform(4555, 320, 108, 125, "rgb(128, 128, 128)", "platform"),
      new Platform(2898.0, 150.0, 1827.0, 102.0, "rgb(255, 0, 0)", "bad"),
      new Platform(2835, 225, 2325, 105, "rgb(128, 128, 128)", "platform"),
      new Platform(4802, 500, 100, 100, "rgb(128, 128, 128)", "platform"),
      new Platform(4555.0, 616, 100, 100, "rgb(128, 128, 128)", "platform"),
      new Platform(4120, 559, 239, 113, "rgb(128, 128, 128)", "platform"),
      new Platform(3903, 319, 103, 453, "rgb(128, 128, 128)", "platform"),
      new Platform(4059, 964, 203, 95, "rgb(128, 128, 128)", "platform"),
      new Platform(2835, 312, 1721, 67, "rgb(255, 0, 0)", "bad"),
      new Platform(3670, 555, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(3640, 637, 107, 182, "rgb(128, 128, 128)", "platform"),
      new Platform(3410, 310, 111, 602, "rgb(128, 128, 128)", "platform"),
      new Platform(2748, 1106, 2243, 144, "rgb(255, 0, 0)", "bad"),
      new Platform(3172, 1083, 603, 76, "rgb(128, 128, 128)", "platform"),
      new Platform(3047, 932, 100, 100, "rgb(128, 128, 128)", "platform"),
      new Platform(2537, 888, 212, 362, "rgb(128, 128, 128)", "platform"),
      new Platform(2829, 696, 310, 67, "rgb(128, 128, 128)", "platform"),
      new Platform(2746, 244, 115, 519, "rgb(128, 128, 128)", "platform"),
      new Platform(2152, 778, 307, 100, "rgb(128, 128, 128)", "platform"),
      new Platform(2049, 1033, 498, 217, "rgb(255, 0, 0)", "bad"),
      new Platform(1871, 687, 189, 563, "rgb(128, 128, 128)", "platform"),
      new Platform(2000.0, 150.0, 898.0, 103.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2129, 244, 395, 68, "rgb(255, 0, 0)", "bad"),
      new Platform(2000, 238, 137, 129, "rgb(128, 128, 128)", "platform"),
      new Platform(1555, 749, 353, 173, "rgb(128, 128, 128)", "platform"),
      new Platform(1318, 470, 92, 580, "rgb(128, 128, 128)", "platform"),
      new Platform(1316, 993, 167, 194, "rgb(128, 128, 128)", "platform"),
      new Platform(2523, 233, 97, 346, "rgb(128, 128, 128)", "platform"),
      new Platform(2911, 614, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(2657, 273, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(1831, -163, 91, 262, "rgb(128, 255, 255)", "flipper"),
      new Platform(1687, 561, 100, 100, "rgb(128, 255, 255)", "flipper"),
      new Platform(2843.0, -799.0, 402.0, 80.0, "rgb(255, 0, 0)", "bad"),
      new Platform(4544, -1011, 234, 220, "rgb(128, 128, 128)", "platform"),
      new Platform(2829, -878, 100, 100, "rgb(128, 128, 128)", "platform"),
      new Platform(3909, -947, 637, 154, "rgb(255, 0, 0)", "bad"),
      new Platform(3529, -675, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(3042, -947, 204, 153, "rgb(128, 128, 128)", "platform"),
      new Platform(3909, -1046, 100, 100, "rgb(128, 128, 128)", "platform"),
      new Platform(3195, -1367, 839, 84, "rgb(128, 128, 128)", "platform"),
      new Platform(2208, -1462, 1826, 97, "rgb(128, 128, 128)", "platform"),
      new Platform(3122, -1055, 240, 109, "rgb(128, 128, 128)", "platform"),
      new Platform(3144, -1013, 765, 87, "rgb(255, 0, 0)", "bad"),
      new Platform(5190, 1096, 20.0, 20.0, "rgb(255, 128, 192)", "speed"),
      new Platform(2296, 358, 100, 100, "rgb(128, 128, 128)", "platform"),
      
    ];

    //not the best way to do this but it works with the level editor
    const specialBlocks = ["star", "speed"]
    for (const platform of platforms) {
      let platTag = platform.tag;
      if(!specialBlocks.includes(platform.tag)){
        this.addGameObject(platform);
      }
      else if(platTag == "star"){
        this.addGameObject(new Star(platform.x, platform.y, 50, 50, platform.getComponent(Renderer).color));
      }
      else if(platTag == "speed"){
        this.addGameObject(new Speed(platform.x, platform.y, 20, 20, platform.getComponent(Renderer).color));
      }
    }

    // // Create enemies and add them to the game
    // this.addGameObject(new Enemy(50, this.canvas.height - 90));
    // this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    // this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // // Create collectibles and add them to the game
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));

    this.gameManager = new GameManager();
    this.addGameObject(this.gameManager);

    // Create a player object and add it to the game
    const player = new Player(4972, 453);
    this.addGameObject(player);
    // Set the game's camera target to the player
    this.camera.target = player;

    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
