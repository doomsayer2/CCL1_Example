import { GameObject } from './GameObject.js';

export class Player extends GameObject {
  constructor(x, y, spriteSheet, ctx) {
    super(x, y, 50, 50, null, ctx);
    this.dy = 0; // Vertical velocity
    this.dx = 0; // Horizontal velocity
    this.spriteSheet = spriteSheet; // Sprite sheet for animation
    this.frameX = 0; // Current frame in the sprite sheet (horizontal)
    this.frameY = 0; // Current animation row (vertical)
    this.frameWidth = 16; // Width of each sprite frame
    this.frameHeight = 18; // Height of each sprite frame
    this.frameTimer = 0; // Timer for animation frames
    this.frameInterval = 5; // Interval to switch frames
  }

  update(platforms) {
    this.dy += 0.5; // Gravity effect
    this.x += this.dx;
    this.y += this.dy;

    // Collision detection with platforms
    platforms.forEach((platform) => {
      if (
        this.x < platform.x + platform.width &&
        this.x + this.width > platform.x &&
        this.y < platform.y + platform.height &&
        this.y + this.height > platform.y
      ) {
        if (this.dy > 0 && this.y + this.height - this.dy <= platform.y) {
          this.dy = 0;
          this.y = platform.y - this.height;
        }
      }
    });

    // Update sprite animation
    this.frameTimer++;
    if (this.frameTimer >= this.frameInterval) {
      this.frameX = (this.frameX + 1) % 3; // Assuming 3 frames per row
      this.frameTimer = 0;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.spriteSheet,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
