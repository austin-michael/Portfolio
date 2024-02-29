import * as THREE from "three";

import data from "../../../static/testCurve.json";
import App from "../App";

export default class AnimationController {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.path = this.createCatmullRomCurve(data);
    this.pathHelper();

    this.createGondolas();
  }

  createCatmullRomCurve(json) {
    // Extract the vertices array from the JSON object
    const vertices = json.points;

    // Create an empty array to store THREE.Vector3 instances
    const points = [];

    // Iterate over the vertices and push THREE.Vector3 instances to the points array
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i].x;
      const y = vertices[i].y;
      const z = vertices[i].z;
      points.push(new THREE.Vector3(x, y, z));
    }

    // Create a CatmullRomCurve3 using the points array
    const curve = new THREE.CatmullRomCurve3(points);

    curve.closed = json.closed;

    return curve;
  }

  createGondolas() {
    this.gondolaOne =
      this.scene.children[0].children[0].children[0].children[1].children[0].children[0];
    this.gondolaTwo =
      this.scene.children[0].children[0].children[0].children[1].children[1].children[0];
    this.gondolaThree =
      this.scene.children[0].children[0].children[0].children[1].children[2].children[0];
    this.gondolaFour =
      this.scene.children[0].children[0].children[0].children[1].children[3].children[0];

    const gondolaOnePosition = this.path.getPointAt(0.0);
    const gondolaTwoPosition = this.path.getPointAt(0.25);
    const gondolaThreePosition = this.path.getPointAt(0.5);
    const gondolaFourPosition = this.path.getPointAt(0.75);

    this.gondolaOne.position.copy(gondolaOnePosition);
    this.gondolaTwo.position.copy(gondolaTwoPosition);
    this.gondolaThree.position.copy(gondolaThreePosition);
    this.gondolaFour.position.copy(gondolaFourPosition);
  }

  pathHelper() {
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(
      this.path.getPoints(50)
    );
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const pathObject = new THREE.Line(pathGeometry, pathMaterial);
    this.scene.add(pathObject);
  }

  loop(elapsedTime) {
    const speed = 0.01;
    this.gondolaOne.position.copy(
      this.path.getPointAt((elapsedTime * speed + 0.0) % 1)
    );
    this.gondolaTwo.position.copy(
      this.path.getPointAt((elapsedTime * speed + 0.25) % 1)
    );
    this.gondolaThree.position.copy(
      this.path.getPointAt((elapsedTime * speed + 0.5) % 1)
    );
    this.gondolaFour.position.copy(
      this.path.getPointAt((elapsedTime * speed + 0.75) % 1)
    );

    // const tanget = this.path
    //   .getTangentAt((elapsedTime * speed + 0.0) % 1)
    //   .normalize();
    // this.gondolaOne.lookAt(this.gondolaOne.position.clone().add(tanget));
  }
}
