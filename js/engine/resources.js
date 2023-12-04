// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
};

const PlayerImages = {
  idle: new Image(),
  walk1: new Image(),
  walk2: new Image(),
  walk3: new Image(),
  skid: new Image(),
  jump: new Image(),
  fall: new Image(),
}



// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump.mp3', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
PlayerImages.idle.src = './resources/images/player/idle.png'; 
PlayerImages.walk1.src = './resources/images/player/walk1.png';
PlayerImages.walk2.src = './resources/images/player/walk2.png';
PlayerImages.walk3.src = './resources/images/player/walk3.png';
PlayerImages.skid.src = './resources/images/player/skid.png';
PlayerImages.jump.src = './resources/images/player/jump.png';
PlayerImages.fall.src = './resources/images/player/fall.png';

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles, PlayerImages };
