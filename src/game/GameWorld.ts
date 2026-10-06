import { Container, Graphics } from "pixi.js";
import { Grid } from "./Grid";

export class GameWorld {
  public readonly grid: Grid;
  public readonly width: number;
  public readonly height: number;
  public readonly view: Container;

  constructor(grid: Grid) {
    this.grid = grid;

    this.width = 12;
    this.height = 8;

    this.view = new Container();

    this.createGrid();
  }

  private createGrid(): void {
    const graphics = new Graphics();

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const worldPosition = this.grid.gridToWorld(x, y);

        graphics
          .rect(
            worldPosition.x,
            worldPosition.y,
            this.grid.cellSize,
            this.grid.cellSize
          )
          .fill(0x263238)
          .stroke({
            width: 1,
            color: 0x455a64,
          });
      }
    }

    this.view.addChild(graphics);
  }
}
