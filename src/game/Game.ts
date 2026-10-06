import { Application } from "pixi.js";
import { Grid } from "./Grid";
import { GameWorld } from "./GameWorld";
import { Player } from "../player/Player";

export class Game {
  public readonly app: Application;
  public readonly grid: Grid;

  public world: GameWorld | null;
  public player: Player | null;

  constructor() {
    this.app = new Application();

    this.grid = new Grid(48);

    this.world = null;
    this.player = null;
  }

  public async initialize(): Promise<void> {
    await this.app.init({
      width: 576,
      height: 384,
      background: 0x111111,
      antialias: true,
    });

    document.body.appendChild(this.app.canvas);

    this.createWorld();
    this.createPlayer();

    this.setupInput();
  }

  private createWorld(): void {
    this.world = new GameWorld(this.grid);

    this.app.stage.addChild(this.world.view);
  }

  private createPlayer(): void {
    this.player = new Player(this.grid);

    this.app.stage.addChild(this.player.view);
  }

  private setupInput(): void {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
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
    });
  }
}
