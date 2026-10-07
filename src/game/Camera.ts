import { Container } from "pixi.js";
import { GameWorld } from "./GameWorld";
import { Player } from "../player/Player";

export class Camera {
  public readonly view: Container;

  private readonly viewportWidth: number;
  private readonly viewportHeight: number;

  private readonly world: GameWorld;
  private readonly player: Player;

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

    this.view = new Container();

    this.view.addChild(this.world.view);
    this.view.addChild(this.player.view);

    this.update();
  }

  public update(): void {
    const playerWorldX = this.player.view.x;
    const playerWorldY = this.player.view.y;

    // Put the player in the center of the viewport.
    let cameraX =
      this.viewportWidth / 2 -
      playerWorldX -
      this.player.view.width / 2;

    let cameraY =
      this.viewportHeight / 2 -
      playerWorldY -
      this.player.view.height / 2;

    this.view.x = cameraX;
    this.view.y = cameraY;

    this.clampToWorld();
  }

  private clampToWorld(): void {
    const worldWidth =
      this.world.width * this.world.grid.cellSize;

    const worldHeight =
      this.world.height * this.world.grid.cellSize;

    // Don't allow the camera to reveal anything
    // outside the world.
    const minX = this.viewportWidth - worldWidth;
    const minY = this.viewportHeight - worldHeight;

    this.view.x = Math.min(0, Math.max(minX, this.view.x));
    this.view.y = Math.min(0, Math.max(minY, this.view.y));
  }
}
