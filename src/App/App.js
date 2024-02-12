import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";

let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;

    this.canvas = document.querySelector("canvas.threejs");
    this.scence = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
  }
}
