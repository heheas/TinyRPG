import { Container, Graphics } from "pixi.js";

export class Player {
  constructor(grid) {
    this.grid = grid;

    this.gridX = 5;
    this.gridY = 3;

    this.view = new Container();

    this.createView();
    this.updatePosition();
  }

  createView() {
    const graphics = new Graphics();

    graphics
      .roundRect(8, 8, this.grid.cellSize - 16, this.grid.cellSize - 16, 8)
      .fill(0x4da6ff);

    this.view.addChild(graphics);
  }

  updatePosition() {
    const position = this.grid.gridToWorld(
      this.gridX,
      this.gridY
    );

    this.view.x = position.x;
    this.view.y = position.y;
  }

  move(directionX, directionY) {
    this.gridX += directionX;
    this.gridY += directionY;

    this.updatePosition();
  }
}
