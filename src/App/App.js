import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./Utils/Loop";
import World from "./World/World";
import Resize from "./Utils/Resize";

let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;

    this.canvas = document.querySelector("canvas.threejs");
    this.scence = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.resize = new Resize();
    this.loop = new Loop();
  }
}
