import * as THREE from "three";

import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";
import Click from "../Utils/Click.js";
import { Pane } from "tweakpane";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.pane = this.app.gui.pane;
    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;
    // this.click = new Click();

    this.loadEnvironment();
    this.addLights();
    // this.addLightHelper();
  }

  loadEnvironment() {
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);

    console.log(environmentScene);

    environmentScene.position.set(0, 0, 0);
    // environmentScene.rotation.set(0, -0.6, 0);
    // environmentScene.scale.setScalar(5);

    const shadowCasters = ["TERRAIN", "POLES", "LIFT", "SIGNS", "TREES", "HUT"];

    const shadowReceivers = ["TERRAIN"];

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(-22, 30, 20);
    this.directionalLight.target.position.set(0, 0, 0);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 30;
    this.directionalLight.shadow.camera.right = 30;
    this.directionalLight.shadow.camera.left = -30;
    this.directionalLight.shadow.camera.bottom = -30;
    this.directionalLight.shadow.bias = -0.002;
    this.directionalLight.shadow.normalBias = 0.072;
    this.scene.add(this.directionalLight);
  }

  addLightHelper() {
    const helper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
    this.scene.add(helper);

    this.pane = new Pane();

    this.pane.addInput(this.directionalLight.position, "x", {
      min: -200,
      max: 200,
      step: 1,
    });
    this.pane.addInput(this.directionalLight.position, "y", {
      min: -200,
      max: 200,
      step: 1,
    });
    this.pane.addInput(this.directionalLight.position, "z", {
      min: -200,
      max: 200,
      step: 1,
    });
  }

  loop() {}
}
