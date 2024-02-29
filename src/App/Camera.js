import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

import App from "./App.js";
import { sizesStore } from "./Utils/Store.js";

export default class Camera {
  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;
    this.sizesStore = sizesStore;
    this.sizes = this.sizesStore.getState();

    this.setInstance();
    this.setControls();
    this.setResizeLister();
    // this.addCameraHelper();
  }

  // returns preferred starting fov based upon the width of the screen
  getFOV() {
    if (this.sizes.width > 1500) return 25;
    if (this.sizes.width > 1200) return 30;
    if (this.sizes.width > 900) return 40;
    if (this.sizes.width > 600) return 45;
    return 50;
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      1,
      600
    );
    this.instance.position.x = -55;
    this.instance.position.y = 10;
    this.instance.position.z = 55;
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.minPolarAngle = Math.PI / 4;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minDistance = 50;
    this.controls.maxDistance = 125;
  }

  setResizeLister() {
    this.sizesStore.subscribe((sizes) => {
      this.instance.aspect = sizes.width / sizes.height;
      this.instance.updateProjectionMatrix();
    });
  }

  addCameraHelper() {
    const helper = new THREE.CameraHelper(this.instance);
    this.app.scene.add(helper);

    const axesHelper = new THREE.AxesHelper(5);
    this.app.scene.add(axesHelper);

    this.pane = new Pane();

    this.pane.addInput(this.instance.position, "x", {
      min: -200,
      max: 200,
      step: 1,
    });
    this.pane.addInput(this.instance.position, "y", {
      min: 0,
      max: 200,
      step: 1,
    });
    this.pane.addInput(this.instance.position, "z", {
      min: 0,
      max: 200,
      step: 1,
    });
  }

  loop() {
    this.controls.update();
  }
}
