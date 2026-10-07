import { Container } from "pixi.js";
import { GameWorld } from "./GameWorld";
import { Player } from "../player/Player";

export class Camera {
  public readonly view: Container;

  private readonly viewportWidth: number;
  private readonly viewportHeight: number;

  private readonly followMarginX: number;
  private readonly followMarginY: number;

  private world: GameWorld;
  private player: Player;

  constructor(
    world: GameWorld,
    player: Player,
    viewportWidth: number,
    viewportHeight: number
  ) {
    this.world = world;
    this.player = player;

    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;

    // How far the player can move toward the edge
    // before the camera starts following.
    this.followMarginX = 160;
    this.followMarginY = 100;

    this.view = new Container();

    this.view.addChild(this.world.view);

    this.update();
  }

  public update(): void {
    const playerX = this.player.view.x;
    const playerY = this.player.view.y;

    let cameraX = this.view.x;
    let cameraY = this.view.y;

    const leftBoundary = this.followMarginX;
    const rightBoundary =
      this.viewportWidth - this.followMarginX;

    const topBoundary = this.followMarginY;
    const bottomBoundary =
      this.viewportHeight - this.followMarginY;

    const playerScreenX = playerX + cameraX;
    const playerScreenY = playerY + cameraY;

    if (playerScreenX < leftBoundary) {
      cameraX += leftBoundary - playerScreenX;
    }

    if (playerScreenX > rightBoundary) {
      cameraX -= playerScreenX - rightBoundary;
    }

    if (playerScreenY < topBoundary) {
      cameraY += topBoundary - playerScreenY;
    }

    if (playerScreenY > bottomBoundary) {
      cameraY -= playerScreenY - bottomBoundary;
    }

    this.view.x = cameraX;
    this.view.y = cameraY;

    this.clampToWorld();
  }

  private clampToWorld(): void {
    const worldWidth =
      this.world.width * this.world.grid.cellSize;

    const worldHeight =
      this.world.height * this.world.grid.cellSize;

    const minX = this.viewportWidth - worldWidth;
    const minY = this.viewportHeight - worldHeight;

    this.view.x = Math.min(0, Math.max(minX, this.view.x));
    this.view.y = Math.min(0, Math.max(minY, this.view.y));
  }
}
