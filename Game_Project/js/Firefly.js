
//==================>>
// Firefly Class
class Firefly extends Particle { // inherited from the Particle class
    update() { // updates the position and behaviour
        this.angle += this.va; // increases angle for movement variation
        this.collisionX += Math.cos(this.angle) * this.speedX; // updating the position using angle and speed
        this.collisionY -= this.speedY; // moving vertically upwards
        if (this.collisionY < 0 - this.radius) {
            this.markedForDeletion = true; // if the firefly is off the screen, it will be marked for removal
            this.game.removeGameObjects(); // removing game objects
        }
    }
}