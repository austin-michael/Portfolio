import * as THREE from "three";

import App from "../App";
import { sizesStore } from "./Store";
import ModalManager from "../UI/ModalManager";

export default class Click {
  constructor() {
    this.app = new App();
    this.camera = this.app.camera;
    this.scene = this.app.scene;
    this.renderer = this.app.renderer;
    this.sizesStore = sizesStore;
    this.sizes = this.sizesStore.getState();

    this.modalManager = new ModalManager();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera.instance);
      const intersects = this.raycaster.intersectObjects(this.scene.children);

      for (var i = 0; i < intersects.length; i++) {
        console.log(intersects[i]);
        if (intersects[i].object.name.includes("portal")) {
          this.modalManager.openModal("Projects", "Test");
        }
      }
    };

    window.addEventListener("click", onMouseClick, false);
  }
}
