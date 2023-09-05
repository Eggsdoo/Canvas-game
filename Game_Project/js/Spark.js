
//==================>>
// Spark Class
class Spark extends Particle { // inherited from the Particle class
    update() { // updates the position, size, and behaviour
        this.angle += this.va * 0.5;
        this.collisionX -= Math.cos(this.angle) * this.speedX;
        this.collisionY -= Math.sin(this.angle) * this.speedY;
        if (this.radius > 0.1) { // decreasing size of spark over time
            this.radius -= 0.5;
        }

        if (this.radius < 0.2) { // checking for size of spark, if the checked size is reached, it'll be marked and removed
            this.markedForDeletion = true;
            this.game.removeGameObjects();
        }
    }
}