import * as THREE from "three";

import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";
import Click from "../Utils/Click.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.pane = this.app.gui.pane;
    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;
    this.click = new Click();

    this.loadEnvironment();
    this.addLights();
  }

  loadEnvironment() {
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);

    environmentScene.position.set(0, 0, 0);
    environmentScene.rotation.set(0, -0.6, 0);
    environmentScene.scale.setScalar(1.3);

    const shadowCasters = [
      "trees",
      "terrain",
      "rocks",
      "stairs",
      "gates",
      "bushes",
    ];

    const shadowReceivers = ["floor", "terrain"];

    for (const child of environmentScene.children) {
      child.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = shadowCasters.some((keyword) =>
            child.name.includes(keyword)
          );
          obj.receiveShadow = shadowReceivers.some((keyword) =>
            child.name.includes(keyword)
          );
        }
      });
    }
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 30;
    this.directionalLight.shadow.camera.right = 30;
    this.directionalLight.shadow.camera.left = -30;
    this.directionalLight.shadow.camera.bottom = -30;
    this.directionalLight.shadow.bias = -0.002;
    this.directionalLight.shadow.normalBias = 0.072;
    this.scene.add(this.directionalLight);
  }

  loop() {}
}
