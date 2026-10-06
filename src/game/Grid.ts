export class Grid {
  constructor(cellSize = 48) {
    this.cellSize = cellSize;
  }

  gridToWorld(gridX, gridY) {
    return {
      x: gridX * this.cellSize,
      y: gridY * this.cellSize,
    };
  }

  worldToGrid(worldX, worldY) {
    return {
      x: Math.floor(worldX / this.cellSize),
      y: Math.floor(worldY / this.cellSize),
    };
  }
}
