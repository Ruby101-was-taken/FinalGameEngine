// Import the required modules and classes.
import Component from './component.js';

// The Renderer class extends Component and handles the visual representation of a game object.
class Renderer extends Component {
  // The constructor initializes the renderer component with optional color, width, height, and image.
  constructor(color = 'white', width = 50, height = 50, image = null, offSet = {x:0, y:0}) {
    super(); // Call the parent constructor.
    this.color = color; // Initialize the color.
    this.width = width; // Initialize the width.
    this.height = height; // Initialize the height.
    this.image = image; // Initialize the image.
    this.offSet = offSet;
    this.show = true;
    this.effects = {};
    }

  addEffect(effect, strength){
    this.effects[effect] = `${effect}(${strength}%)`;
  }
  removeEffect(effect){
    this.effects[effect] = "";
  }

  // The draw method handles rendering the game object on the canvas.
  draw(ctx) {
    if(this.show){
      // If an image is provided and it has finished loading, draw the image.
      if (this.image && this.image.complete) {
        // Get the position and dimensions of the game object.
        const x = this.gameObject.x;
        const y = this.gameObject.y;
        const w = this.width;
        const h = this.height;
        // Check if the image should be flipped horizontally based on the direction of the game object.
        const flipX = this.gameObject.direction === -1;
        const flipY = this.gameObject.directionY === -1;

        let effectedImage = new Image();
        effectedImage.src = this.image.src;
        let effectsToAdd = "";
        for(let effect in this.effects){
          effectsToAdd += `${this.effects[effect]} `
        }

        ctx.filter = effectsToAdd;

        if (!flipX && !flipY) {
          // If the image should not be flipped, draw it as is.
          ctx.drawImage(effectedImage, x-this.offSet.x, y-this.offSet.y, w, h);
        } else {
          // If the image should be flipped, save the current drawing state,
          // translate and scale the drawing context to flip the image,
          // draw the image, and then restore the drawing state.
          ctx.save();
          ctx.translate(flipX ? x-this.offSet.x + w : x-this.offSet.x, flipY ? y+this.offSet.y + h : y-this.offSet.y);
          ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
          ctx.drawImage(effectedImage, 0, 0, w, h);
          ctx.restore();
        }
      } else {
        // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
        ctx.fillStyle = this.color;
        ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
      }
    }
  }
}

// The Renderer class is then exported as the default export of this module.
export default Renderer;
