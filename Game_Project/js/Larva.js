
//==================>>
// Larva Class
class Larva {
    constructor(game, x, y) { // constructor and properties
        this.game = game;
        this.collisionX = x;
        this.collisionY = y;
        this.collisionRadius = 30;
        this.image = document.querySelector('#larva');
        this.spriteWidth = 150;
        this.spriteHeight = 150;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX;
        this.spriteY;
        this.speedY = 1 + Math.random();
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 2);
    }
    draw(context) {
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY,
            this.width, this.height);
        if (this.game.debug) {
            context.beginPath()
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            context.save();
            context.globalAlpha = 0.5;
            context.fill();
            context.restore();
            context.stroke();
        }
    }
    update() { // updates position, collision, and behaviour
        this.collisionY -= this.speedY;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 40;
        // safety dance
        if (this.collisionY < this.game.topMargin) {
            this.markedForDeletion = true;
            this.game.removeGameObjects();
            if (!this.game.gameOver) this.game.score++;
            for (let i = 0; i < 4; i++) { // this for loop displays particles after reaching destination
                this.game.particles.push(new Firefly(this.game, this.collisionX, this.collisionY, 'yellow'));
            }
        }
        // collisions with objects
        let collisionObjects = [this.game.player, ...this.game.obstacles, ...this.game.eggs];
        collisionObjects.forEach(object => {
            let [collision, distance, sumOfRadii, dx, dy] =
                this.game.checkCollision(this, object);
            if (collision) {
                const unit_x = dx / distance;
                const unit_y = dy / distance;
                this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
                this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
            }
        });
        // collisions with enemies
        this.game.enemies.forEach(enemy => {
            if (this.game.checkCollision(this, enemy)[0] && !this.game.gameOver) {
                this.markedForDeletion = true;
                this.game.removeGameObjects();
                this.game.lostHatchlings++;
                for (let i = 0; i < 7; i++) { // this for loop displays sparks
                    this.game.particles.push(new Spark(this.game, this.collisionX, this.collisionY, 'blue'));
                }
            }
        });
    }
}