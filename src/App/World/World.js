import App from "../App.js";
import Environment from "./Environment.js";
import { appStateStore } from "../Utils/Store.js";
import AnimationController from "./AnimationController.js";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    const unsub = appStateStore.subscribe((state) => {
      if (state.assetsReady) {
        this.environment = new Environment();
        // this.animationController = new AnimationController();
        unsub();
      }
    });

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    if (this.environment) this.environment.loop();
    // if (this.animationController) this.animationController.loop(elapsedTime);
  }
}
