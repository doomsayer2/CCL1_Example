export class GameObject {
    constructor(x, y, width, height, image = null, ctx) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = image; // Optional: Image for rendering the object
      this.ctx = ctx;
    }
  
    draw() {
      if (this.image) {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }
  