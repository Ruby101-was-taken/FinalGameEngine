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
import MusicPlayer from './musicPlayer.js';

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
      new Platform(2470.0, -152.0, 145.0, 29.0, "rgb(255, 0, 0)", "bad"),
      new Platform(2383.0, -207.0, 87.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2383.0, -12.0, 87.0, 162.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4238.0, -299.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5543.0, -525.0, 615.0, 228.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5343.0, -122.0, 649.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4882.0, -408.5, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(4839.0, -341.5, 138.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2896.0, -202.5, 165.0, 33.0, "rgb(255, 0, 0)", "bad"),
      new Platform(3048.0, -268.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2615.0, -167.0, 108.0, 231.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1949.0, -300.0, 950.0, 148.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5358.0, 492.5, 238.0, 123.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5122.0, 777.5, 296.0, 115.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2898.0, 150.0, 1827.0, 102.0, "rgb(255, 0, 0)", "bad"),
      new Platform(2835.0, 225.0, 2325.0, 105.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4555.0, 616.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4120.0, 559.0, 239.0, 113.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3903.0, 319.0, 103.0, 453.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4059.0, 964.0, 203.0, 95.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3670.0, 555.0, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(3640.0, 637.0, 107.0, 182.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3410.0, 310.0, 111.0, 602.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3047.0, 932.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2537.0, 888.0, 212.0, 362.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2829.0, 696.0, 310.0, 67.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2746.0, 244.0, 115.0, 519.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2152.0, 778.0, 307.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1871.0, 687.0, 189.0, 563.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2000.0, 150.0, 898.0, 103.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2129.0, 244.0, 395.0, 68.0, "rgb(255, 0, 0)", "bad"),
      new Platform(2000.0, 238.0, 137.0, 129.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1555.0, 749.0, 353.0, 173.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1318.0, 470.0, 92.0, 580.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2523.0, 233.0, 97.0, 346.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2911.0, 614.0, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(2657.0, 273.0, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(2843.0, -799.0, 402.0, 80.0, "rgb(255, 0, 0)", "bad"),
      new Platform(2829.0, -878.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3909.0, -947.0, 637.0, 154.0, "rgb(255, 0, 0)", "bad"),
      new Platform(3529.0, -675.0, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(3042.0, -947.0, 204.0, 153.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3909.0, -1046.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3195.0, -1367.0, 839.0, 84.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2208.0, -1462.0, 1826.0, 97.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5190.0, 1096.0, 20.0, 20.0, "rgb(255, 128, 192)", "speed"),
      new Platform(1817.0, -36.0, 100.0, 132.0, "rgb(128, 255, 255)", "flipper"),
      new Platform(1817.0, -173.0, 100.0, 138.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5231.0, 1096.0, 20.0, 20.0, "rgb(255, 128, 192)", "speed"),
      new Platform(4149.0, -1444.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3122.0, -1055.0, 240.0, 109.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3246.0, -992.0, 663.0, 69.0, "rgb(255, 0, 0)", "bad"),
      new Platform(3624.0, -1103.0, 20.0, 20.0, "rgb(255, 128, 192)", "speed"),
      new Platform(4802.0, 500.0, 100.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4555.0, 320.0, 108.0, 125.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1668.0, -131.0, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(1485.0, 1188.0, 275.0, 79.0, "rgb(128, 255, 255)", "flipper"),
      new Platform(1485.0, 1267.0, 275.0, 196.0, "rgb(128, 128, 128)", "platform"),
      new Platform(1318.0, 993.0, 168.0, 470.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2049.0, 1630.0, 498.0, 100.0, "rgb(128, 255, 255)", "flipper"),
      new Platform(2546.0, 1531.0, 559.0, 199.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3172.0, 1083.0, 603.0, 252.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3354.0, 1630.0, 839.0, 100.0, "rgb(128, 255, 255)", "flipper"),
      new Platform(1759.0, 1363.0, 193.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2049.0, 1033.0, 498.0, 145.0, "rgb(255, 0, 0)", "bad"),
      new Platform(3775.0, 1250.0, 409.0, 85.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4179.0, 1250.0, 263.0, 270.0, "rgb(128, 128, 128)", "platform"),
      new Platform(3675.0, 1333.0, 25.0, 145.0, "rgb(255, 0, 0)", "bad"),
      new Platform(3105.0, 1630.0, 250.0, 100.0, "rgb(255, 0, 0)", "bad"),
      new Platform(4545.0, -297.0, 798.0, 549.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4432.0, 1221.0, 361.0, 64.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4173.0, 1680.0, 732.0, 100.0, "rgb(128, 255, 255)", "flipper"),
      new Platform(2546.0, 1729.0, 2503.0, 103.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4896.0, 1238.0, 173.0, 593.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2748.0, 1106.0, 2045.0, 144.0, "rgb(255, 0, 0)", "bad"),
      new Platform(4472.0, 1325.0, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(4110.0, 1353.0, 20.0, 20.0, "rgb(255, 128, 192)", "speed"),
      new Platform(900.0, -300.0, 719.0, 812.0, "rgb(128, 128, 128)", "platform"),
      new Platform(870.0, 484.0, 471.0, 979.0, "rgb(128, 128, 128)", "platform"),
      new Platform(2835.0, 312.0, 1721.0, 67.0, "rgb(255, 0, 0)", "bad"),
      new Platform(5576.0, 188.0, 1633.0, 1061.5, "rgb(128, 128, 128)", "platform"),
      new Platform(6156.0, -525.0, 1606.0, 981.0, "rgb(128, 128, 128)", "platform"),
      new Platform(6190, -1549, 1633, 386, "rgb(128, 128, 128)", "platform"),
      new Platform(6686, -1303, 1209, 894, "rgb(128, 128, 128)", "platform"),
      new Platform(6200, -1118, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(4030, -1557, 2241, 100, "rgb(255, 0, 0)", "bad"),
      new Platform(5379, -1326, 100, 100, "rgb(128, 128, 128)", "platform"),
      new Platform(5151, -863, 486, 77, "rgb(128, 255, 255)", "flipper"),
      new Platform(5343.0, -800.0, 1089.0, 100.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5622, -1027, 120, 240, "rgb(128, 128, 128)", "platform"),
      new Platform(4771, -988, 272, 212, "rgb(255, 0, 0)", "bad"),
      new Platform(4544.0, -1011.0, 234.0, 220.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4545.0, -800.0, 798.0, 275.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5041, -1101, 111, 308, "rgb(128, 128, 128)", "platform"),
      new Platform(2208, -1402, 113, 264, "rgb(128, 128, 128)", "platform"),
      new Platform(2371, -1255, 50.0, 50.0, "rgb(255, 255, 128)", "star"),
      new Platform(1047, -1273, 591, 587, "rgb(128, 128, 128)", "platform"),
      new Platform(1554, 1438, 225, 803, "rgb(128, 128, 128)", "platform"),
      new Platform(1691, 2011, 1245, 424, "rgb(128, 128, 128)", "platform"),
      new Platform(2545, 1799, 396, 304, "rgb(128, 128, 128)", "platform"),
      new Platform(2446, 1744, 100, 100, "rgb(128, 128, 128)", "speed"),
      new Platform(2336.0, 1744.0, 100, 100, "rgb(128, 128, 128)", "speed"),
      new Platform(4896.0, 500.0, 262.0, 504.0, "rgb(128, 128, 128)", "platform"),
      new Platform(5109.0, 1142.5, 628.0, 107.0, "rgb(128, 128, 128)", "platform"),
      new Platform(4896.0, 1142.0, 232.0, 100, "rgb(255, 0, 0)", "bad"),
      new Platform(5128.0, 865.0, 100, 100, "rgb(128, 128, 128)", "platform"),
             
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
    const player = new Player(0, -70);
    this.addGameObject(player);
    // Set the game's camera target to the player
    this.camera.target = player;

    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));


    setTimeout (() => {this.addGameObject(new MusicPlayer()); console.log("help");}, 1000)
  }
  
}

// Export the Level class as the default export of this module
export default Level;
