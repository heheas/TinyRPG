import { Container, Graphics } from "pixi.js";
import { Grid } from "../game/Grid";

export class Player {
  public readonly grid: Grid;
  public readonly view: Container;

  public gridX: number;
  public gridY: number;

  constructor(grid: Grid) {
    this.grid = grid;

    // Start in the center of the 200 × 200 world.
    this.gridX = 100;
    this.gridY = 100;

    this.view = new Container();

    this.createView();
    this.updatePosition();
  }

  private createView(): void {
    const graphics = new Graphics();

    graphics
      .roundRect(
        8,
        8,
        this.grid.cellSize - 16,
        this.grid.cellSize - 16,
        8
      )
      .fill(0x4da6ff);

    this.view.addChild(graphics);
  }

  private updatePosition(): void {
    const position = this.grid.gridToWorld(
      this.gridX,
      this.gridY
    );

    this.view.x = position.x;
    this.view.y = position.y;
  }

  public move(
    directionX: number,
    directionY: number
  ): void {
    this.gridX += directionX;
    this.gridY += directionY;

    this.updatePosition();
  }
}
