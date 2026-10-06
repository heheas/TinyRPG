export class Grid {
  public readonly cellSize: number;

  constructor(cellSize: number = 48) {
    this.cellSize = cellSize;
  }

  gridToWorld(gridX: number, gridY: number): { x: number; y: number } {
    return {
      x: gridX * this.cellSize,
      y: gridY * this.cellSize,
    };
  }

  worldToGrid(worldX: number, worldY: number): { x: number; y: number } {
    return {
      x: Math.floor(worldX / this.cellSize),
      y: Math.floor(worldY / this.cellSize),
    };
  }
}
