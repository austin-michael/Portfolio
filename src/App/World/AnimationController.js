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
    this.gondolaBoundingBox = new THREE.Box3().setFromObject(this.gondolaOne);
    this.gondolaHeight =
      this.gondolaBoundingBox.max.y - this.gondolaBoundingBox.min.y;
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
      this.scene.children[0].children[0].children[0].children[1].children[3].children[0];
    this.gondolaTwo =
      this.scene.children[0].children[0].children[0].children[1].children[2].children[0];
    this.gondolaThree =
      this.scene.children[0].children[0].children[0].children[1].children[1].children[0];
    this.gondolaFour =
      this.scene.children[0].children[0].children[0].children[1].children[0].children[0];

    this.gondolaOneInitialPosition = this.gondolaOne.position.clone();
    this.gondolaTwoInitialPosition = this.gondolaTwo.position.clone();
    this.gondolaThreeInitialPosition = this.gondolaThree.position.clone();
    this.gondolaFourInitialPosition = this.gondolaFour.position.clone();
  }

  pathHelper() {
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(
      this.path.getPoints(50)
    );
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const pathObject = new THREE.Line(pathGeometry, pathMaterial);
    this.scene.add(pathObject);
  }

  calculatePosition(speed, elapsedTime) {
    // GONDOLA 1
    const offset1 = this.path
      .getPointAt((elapsedTime * speed) % 1)
      .sub(this.gondolaOneInitialPosition);
    this.gondolaOne.position.copy(this.gondolaOneInitialPosition).add(offset1);
    this.gondolaOne.position.y =
      this.path.getPointAt((elapsedTime * speed) % 1).y -
      this.gondolaHeight / 2;

    // GONDOLA 2
    const offset2 = this.path
      .getPointAt((elapsedTime * speed + 0.25) % 1)
      .sub(this.gondolaTwoInitialPosition);
    this.gondolaTwo.position.copy(this.gondolaTwoInitialPosition).add(offset2);
    this.gondolaTwo.position.y =
      this.path.getPointAt((elapsedTime * speed + 0.25) % 1).y -
      this.gondolaHeight / 2;

    // GONDOLA 3
    const offset3 = this.path
      .getPointAt((elapsedTime * speed + 0.5) % 1)
      .sub(this.gondolaThreeInitialPosition);
    this.gondolaThree.position
      .copy(this.gondolaThreeInitialPosition)
      .add(offset3);
    this.gondolaThree.position.y =
      this.path.getPointAt((elapsedTime * speed + 0.5) % 1).y -
      this.gondolaHeight / 2;

    // GONDOLA 4
    const offset4 = this.path
      .getPointAt((elapsedTime * speed + 0.75) % 1)
      .sub(this.gondolaFourInitialPosition);
    this.gondolaFour.position
      .copy(this.gondolaFourInitialPosition)
      .add(offset4);
    this.gondolaFour.position.y =
      this.path.getPointAt((elapsedTime * speed + 0.75) % 1).y -
      this.gondolaHeight / 2;
  }

  calculateRotation(speed, elapsedTime) {}

  loop(elapsedTime) {
    const speed = 0.001;

    this.calculatePosition(speed, elapsedTime);
    this.calculateRotation(speed, elapsedTime);
  }
}
