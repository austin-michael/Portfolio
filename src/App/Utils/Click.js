import * as THREE from "three";

import App from "../App";
import { sizesStore } from "./Store";
import ModalManager from "../UI/ModalManager";
import ModalContentProvider from "../UI/ModalContentProvider";

export default class Click {
  constructor() {
    this.app = new App();
    this.camera = this.app.camera;
    this.scene = this.app.scene;
    this.renderer = this.app.renderer;
    this.sizesStore = sizesStore;
    this.sizes = this.sizesStore.getState();

    this.modalContentProvider = new ModalContentProvider();
    this.modalManager = new ModalManager();
  }

  mouseClickHandler(event) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
    this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    this.intersections = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );

    this.intersections.forEach((intersection) => {
      const individualObject = intersection.object;
      const objectParentName = individualObject.parent.name;
      switch (objectParentName) {
        case "PROJECTS":
          console.log("clicked projects");
          const modalContent =
            this.modalContentProvider.fetchModalContents("PROJECTS");
          this.modalManager.openModal("Projects", modalContent);
          break;
        // case "ABOUT":
        //   this.modalManager.openModal("About Me", "test");
        //   break;

        // case "EXPERIENCE":
        //   this.modalManager.openModal("Experience", "test");
        //   break;
      }
    });
  }
}
