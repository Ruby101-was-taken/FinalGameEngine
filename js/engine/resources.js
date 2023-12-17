// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
};

const PlayerImages = {
  idle: new Image(),
  idle1: new Image(),
  walk1: new Image(),
  walk2: new Image(),
  walk3: new Image(),
  skid: new Image(),
  jump: new Image(),
  fall: new Image(),
  wait1: new Image(),
  wait2: new Image(),
  wait3: new Image(),
  wait4: new Image(),
  teeter1: new Image(),
  teeter2: new Image(),
}


// Set the source of the player image.
PlayerImages.idle.src = './resources/images/player/idle.png'; 
PlayerImages.idle1.src = './resources/images/player/idle1.png'; 
PlayerImages.walk1.src = './resources/images/player/walk1.png';
PlayerImages.walk2.src = './resources/images/player/walk2.png';
PlayerImages.walk3.src = './resources/images/player/walk3.png';
PlayerImages.skid.src = './resources/images/player/skid.png';
PlayerImages.jump.src = './resources/images/player/jump.png';
PlayerImages.fall.src = './resources/images/player/fall.png';
PlayerImages.wait1.src = './resources/images/player/wait1.png';
PlayerImages.wait2.src = './resources/images/player/wait2.png';
PlayerImages.wait3.src = './resources/images/player/wait3.png';
PlayerImages.wait4.src = './resources/images/player/wait4.png';
PlayerImages.teeter1.src = './resources/images/player/teeter1.png';
PlayerImages.teeter2.src = './resources/images/player/teeter2.png';

const SpeedImages = {
  f1: new Image(),
  f2: new Image(),
  f3: new Image(),
  f4: new Image(),
}

SpeedImages.f1.src = "./resources/images/powerUp/speed/speed1.png"
SpeedImages.f2.src = "./resources/images/powerUp/speed/speed2.png"
SpeedImages.f3.src = "./resources/images/powerUp/speed/speed3.png"
SpeedImages.f4.src = "./resources/images/powerUp/speed/speed4.png"

const TerrainTextures = {
  lava1: new Image(),
  lava2: new Image(),
  lava3: new Image(),

  "p1": new Image(),
  "p2": new Image(),
  "p3": new Image(),
  "p4": new Image(),
  "p5": new Image(),
  "p6": new Image(),
  "p7": new Image(),
}

TerrainTextures.lava1.src = "./resources/images/terrain/lava.jpg" //https://depositphotos.com/photo/lava-texture-10274943.html (17/12/2023)
TerrainTextures.lava2.src = "./resources/images/terrain/lava2.jpg" //https://depositphotos.com/photo/fire-flame-texture-background-132085628.html (17/12/2023)
TerrainTextures.lava3.src = "./resources/images/terrain/lava3.png" //https://depositphotos.com/photo/red-brown-lava-rock-background-and-texture-256229320.html (17/12/2023)

TerrainTextures["p1"].src = "./resources/images/terrain/platform1.png"; 
TerrainTextures["p2"].src = "./resources/images/terrain/platform2.png"; 
TerrainTextures["p3"].src = "./resources/images/terrain/platform3.png"; 
TerrainTextures["p4"].src = "./resources/images/terrain/platform4.png"; 
TerrainTextures["p5"].src = "./resources/images/terrain/platform5.png"; 
TerrainTextures["p6"].src = "./resources/images/terrain/platform6.png"; 
TerrainTextures["p7"].src = "./resources/images/terrain/platform7.png"; 


const StarImg = new Image();
StarImg.src = "./resources/images/powerUp/star.png";

// Create an AudioFiles object to hold the file paths of the audio resources. created with https://sfxr.me/
const AudioFiles = {
  jump: new Audio('./resources/audio/jump.wav'),
  land: new Audio("./resources/audio/land.wav"),
  hit: new Audio("./resources/audio/hit.wav"),
  step: new Audio("./resources/audio/step.wav"),
  flip: new Audio("./resources/audio/flip.wav"),
  star: new Audio("./resources/audio/star.wav"),
  speedUp: new Audio("./resources/audio/speedUp.wav"),
};

// https://opengameart.org/content/jump-button-funky-action-game-music (17/12/2023)
const Music = {
  intro: new Audio("./resources/audio/music/intro.mp3"),
  loop: new Audio("./resources/audio/music/loop.mp3"),
}


// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path



// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles, PlayerImages, SpeedImages, TerrainTextures, Music, StarImg };
