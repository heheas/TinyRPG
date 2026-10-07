import { Container, Graphics } from "pixi.js";
import { Grid } from "./Grid";

export class GameWorld {
  public readonly grid: Grid;
  public readonly width: number;
  public readonly height: number;
  public readonly view: Container;

  private readonly treeCount = 300;

  constructor(grid: Grid) {
    this.grid = grid;

    this.width = 200;
    this.height = 200;

    this.view = new Container();

    this.createGrid();
    this.createTrees();
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

  private createTrees(): void {
    const trees = new Graphics();

    for (let i = 0; i < this.treeCount; i++) {
      const gridX = Math.floor(Math.random() * this.width);
      const gridY = Math.floor(Math.random() * this.height);

      const worldPosition = this.grid.gridToWorld(gridX, gridY);

      trees
        .rect(
          worldPosition.x + 8,
          worldPosition.y + 8,
          this.grid.cellSize - 16,
          this.grid.cellSize - 16
        )
        .fill(0x2e7d32);
    }

    this.view.addChild(trees);
  }
}
