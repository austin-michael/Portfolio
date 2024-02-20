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

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      1,
      600
    );
    this.instance.position.z = 70;
    this.instance.position.y = 35;
    this.instance.position.x = -70;
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
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
