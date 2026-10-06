import { Application } from "pixi.js";
import { Grid } from "./Grid.js";
import { GameWorld } from "./GameWorld.js";
import { Player } from "../player/Player.js";

export class Game {
  constructor() {
    this.app = new Application();

    this.grid = new Grid(48);

    this.world = null;
    this.player = null;
  }

  async initialize() {
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

  createWorld() {
    this.world = new GameWorld(this.grid);

    this.app.stage.addChild(this.world.view);
  }

  createPlayer() {
    this.player = new Player(this.grid);

    this.app.stage.addChild(this.player.view);
  }

  setupInput() {
    window.addEventListener("keydown", (event) => {
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
