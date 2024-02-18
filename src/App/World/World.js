import * as THREE from "three";

import App from "../App.js";
import Environment from "./Environment.js";

import { appStateStore } from "../Utils/Store.js";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    // create world classes
    const unsub = appStateStore.subscribe((state) => {
      if (state.assetsReady) {
        this.environment = new Environment();
        unsub();
      }
    });

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    if (this.environment) this.environment.loop();
  }
}
