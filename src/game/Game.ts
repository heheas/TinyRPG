import { Application } from "pixi.js";
import { Grid } from "./Grid";
import { GameWorld } from "./GameWorld";
import { Camera } from "./Camera";
import { Player } from "../player/Player";

export class Game {
  public readonly app: Application;
  public readonly grid: Grid;

  public world: GameWorld | null;
  public player: Player | null;
  public camera: Camera | null;

  private readonly viewportWidth = 576;
  private readonly viewportHeight = 384;

  constructor() {
    this.app = new Application();

    this.grid = new Grid(48);

    this.world = null;
    this.player = null;
    this.camera = null;
  }

  public async initialize(): Promise<void> {
    await this.app.init({
      width: this.viewportWidth,
      height: this.viewportHeight,
      background: 0x111111,
      antialias: true,
    });

    // Append the application canvas to the document body
    document.getElementById("tinyrpg-container")!.appendChild(this.app.canvas);

    this.createWorld();
    this.createPlayer();
    this.createCamera();

    this.setupInput();
  }

  private createWorld(): void {
    this.world = new GameWorld(this.grid);
  }

  private createPlayer(): void {
    this.player = new Player(this.grid);
  }

  private createCamera(): void {
    if (this.world === null || this.player === null) {
      return;
    }

    this.camera = new Camera(
      this.world,
      this.player,
      this.viewportWidth,
      this.viewportHeight
    );

    this.camera.view.addChild(this.player.view);

    this.app.stage.addChild(this.camera.view);
  }

  private setupInput(): void {
    window.addEventListener(
      "keydown",
      (event: KeyboardEvent) => {
        if (this.player === null) {
          return;
        }

        switch (event.key) {
          case "ArrowUp":
          case "w":
          case "W":
            this.player.move(0, -1);
            break;

          case "ArrowDown":
          case "s":
          case "S":
            this.player.move(0, 1);
            break;

          case "ArrowLeft":
          case "a":
          case "A":
            this.player.move(-1, 0);
            break;

          case "ArrowRight":
          case "d":
          case "D":
            this.player.move(1, 0);
            break;
        }

        this.camera?.update();
      }
    );
  }
}
