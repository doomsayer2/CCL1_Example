import { GameObject } from './GameObject.js';

export class Platform extends GameObject {
  constructor(x, y, width, height = 10, color = 'black', ctx) {
    super(x, y, width, height, null, ctx);
    this.color = color; // Color of the platform
  }

  draw() {
    this.ctx.fillStyle = this.color; // Use the color property
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
