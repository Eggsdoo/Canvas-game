
//==================>>
// Particle Class
class Particle { // this class is inherited by Firefly and Spark class
    constructor(game, x, y, color) { // constructor and properties
        this.game = game;
        this.collisionX = x;
        this.collisionY = y;
        this.color = color; // color of particle
        this.radius = Math.floor(Math.random() * 10 + 5);
        this.speedX = Math.random() * 6 - 3; // horizontal speed of particle
        this.speedY = Math.random() * 2 + 0.5; // vertical speed of particle
        this.angle = 0; // angle for movement variation
        this.va = Math.random() * 0.1 + 0.1; // angle change for variation
        this.markedForDeletion = false;
    }
    draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        context.restore();
    }
}