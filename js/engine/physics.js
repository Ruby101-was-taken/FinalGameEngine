// Import the required modules and classes.
import Collectible from '../game/collectible.js';
import Component from './component.js';
import Renderer from './renderer.js';

// The Physics class extends Component and handles the physics behavior of a game object.
class Physics extends Component {
  // The constructor initializes the physics component with optional initial velocity, acceleration, and gravity.
  constructor(velocity = { x: 0, y: 0 }, acceleration = { x: 0, y: 0 }, decceleration = { x: 0, y: 0 }, gravity = { x: 0, y: 50 }, isSolid=false) {
    super(); // Call the parent constructor.
    this.velocity = velocity; // Initialize the velocity.
    this.acceleration = acceleration; // Initialize the acceleration.
    this.decceleration = decceleration; // Initialize the decceleration.
    this.gravity = gravity; // Initialize the gravity.
    this.isSolid = isSolid;
    this.isGrounded = false;

    this.width = null;
    this.height = null;
  }
 
  // The update method handles how the component's state changes over time.
  update(deltaTime, print=false) {
    // Update velocity based on acceleration and gravity.
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += (this.acceleration.y + this.gravity.y) * deltaTime;

    // Move the game object based on the velocity.
    
    const solidObjs = this.gameObject.game.gameObjects.filter((obj) => obj.hasComponent(Physics) && obj.getComponent(Physics).isSolid); //find solid objects first,


    this.isGrounded = false;
    for(let i=0; i<Math.abs(this.velocity.y); i++){
      this.gameObject.y+=Math.sign(this.velocity.y);
      for(const obj of solidObjs){
        if(obj.getComponent(Physics).isColliding(this)){
          if(this.velocity.y<0){
            this.gameObject.y+=1;
            this.velocity.y=0; 
            this.velocity.y=+1; 
          } 
          else if(this.velocity.y>=0){
            this.gameObject.y-=1;
            this.isGrounded = true;
            this.velocity.y=0;
          }
        }
      }
    }
    for(let i=0; i<Math.abs(this.velocity.x); i++){
      this.gameObject.x+=Math.sign(this.velocity.x);
      //this.gameObject.y--;
      for(const obj of solidObjs){
           if(obj.getComponent(Physics).isColliding(this)){
            this.gameObject.x-=Math.sign(this.velocity.x);
            this.velocity.x = 0;
           }
        }
      //this.gameObject.y++;
    }


    if(this.velocity.x > 0){
      this.velocity.x -= this.decceleration.x * deltaTime;
      if(this.velocity.x < 0.1){
        this.velocity.x = 0;
      }
    }
    else if(this.velocity.x < 0){
      this.velocity.x += this.decceleration.x * deltaTime;
      if(this.velocity.x > -0.1){
        this.velocity.x = 0;
      }
    }

    // og code
    // this.gameObject.x += this.velocity.x * deltaTime;
    // this.gameObject.y += this.velocity.y * deltaTime;
    this.acceleration.x = 0;
  }

  // The isColliding method checks if this game object is colliding with another game object.
  isColliding(otherPhysics) {
    // Get the bounding boxes of both game objects.
    const [left, right, top, bottom] = this.getBoundingBox();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox();

    // Check if the bounding boxes overlap. If they do, return true. If not, return false.
    return (left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop) && !this.equals(otherPhysics);
  }

  setBoundingSize(w,h){
    this.width = w;
    this.height = h;
  }

  // The getBoundingBox method returns the bounding box of the game object in terms of its left, right, top, and bottom edges.
  getBoundingBox() {
    let w = 0;
    let h = 0;
    const renderer = this.gameObject.getComponent(Renderer);
    if(this.width == null && this.height == null){
    // Get the Renderer component of the game object to get its width and height.
      w = renderer.width;
      h = renderer.height;
    }
    else{
      w=this.width;
      h=this.height;
    }

    let x = this.gameObject.x + ((renderer.width/2)-w/2); 
    let y = this.gameObject.y + ((renderer.height/2)-h/2); 

    // Calculate the left, right, top, and bottom edges of the bounding box.
    const left = x;
    const right = x + w;
    const top = y;
    const bottom = y + h;

    // Return the bounding box.
    return [left, right, top, bottom];
  }

}

// The Physics class is then exported as the default export of this module.
export default Physics;
