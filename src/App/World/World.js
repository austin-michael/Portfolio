import * as THREE from "three";

import App from "../App";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scence;

    const cubeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: "red" })
    );
    this.scene.add(cubeMesh);
  }
}
