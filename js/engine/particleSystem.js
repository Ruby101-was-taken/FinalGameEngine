// The required modules and classes are imported at the top of the script.
import GameObject from './gameobject.js';
import Particle from './particle.js';
import Physics from '../engine/physics.js';
import GeneralFunctions from './generalFunctions.js';

// The ParticleSystem class extends GameObject and is responsible for creating and managing a system of particles.
class ParticleSystem extends GameObject {
  // The constructor method initializes a new instance of the ParticleSystem class.
  constructor(x, y, color, count, lifeDuration, emitDuration, physics, power) {
    // Call the constructor of the parent class (GameObject) and pass the position of the particle system.
    super(x, y);
    // Initialize instance properties.
    this.color = color; // Color of the particles.
    this.count = count; // Total number of particles to emit.
    this.lifeDuration = lifeDuration; // The life duration of each particle.
    this.emitDuration = emitDuration; // Duration over which particles should be emitted.
    this.particlesEmitted = 0; // Keep track of how many particles have been emitted.
    this.physics = physics;
    this.power = power;
    this.gf = new GeneralFunctions();
  }

  // The update method is called once per game frame and is responsible for updating the state of the particle system.
  update(deltaTime) {
    // If there's still time left to emit particles...
    if (this.emitDuration > 0) {
      // Emit particles.
      this.emitParticles(deltaTime);
      // Decrease the emit duration by the amount of time that has passed since the last frame.
      this.emitDuration -= deltaTime;
    } else if (this.emitDuration <= 0) {
      // If the emit duration has run out, remove the particle system from the game.
      this.game.removeGameObject(this);
    }
    // Call the update method of the parent class (GameObject), which will update all of the system's components.
    super.update(deltaTime);
  }

  // The emitParticles method is responsible for creating and emitting particles.
  emitParticles(deltaTime) {
    // Calculate how many particles to emit in this frame.
    const particlesToEmit = Math.ceil((this.count / this.emitDuration) * deltaTime);
    // Emit the calculated number of particles.
    for (let i = 0; i < particlesToEmit && this.particlesEmitted < this.count; i++) {
      // Create a new particle with a random life duration, size, and initial velocity.
      const lifeDuration = this.lifeDuration + Math.random() - 0.5;
      const particle = new Particle(this.x, this.y, 5, 5, this.color, lifeDuration);

      particle.addComponent(new Physics({x:this.physics.velocity.x * this.gf.genrateRandomNumber(-this.power, this.power), y:this.physics.velocity.y * this.gf.genrateRandomNumber(-this.power, this.power)}, {x:this.physics.acceleration.x, y:this.physics.acceleration.y}, {x:this.physics.decceleration.x, y:this.physics.decceleration.y}, {x:this.physics.gravity.x, y:this.physics.gravity.y}));
      
      // Add the particle to the game.
      this.game.addGameObject(particle);
      // Increase the count of particles emitted.
      this.particlesEmitted++;
    }
  }
}

// The ParticleSystem class is then exported as the default export of this module.
export default ParticleSystem;
