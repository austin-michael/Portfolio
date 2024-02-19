import * as THREE from "three";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Loop from "./Utils/Loop.js";
import GUI from "./Utils/GUI.js";
import World from "./World/World.js";
import Resize from "./Utils/Resize.js";
import AssetLoader from "./Utils/AssetLoader.js";
import Preloader from "./UI/Preloader.js";

let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;

    // create threejs scene
    this.canvas = document.querySelector("canvas.threejs");
    this.scene = new THREE.Scene();

    // debug gui
    this.gui = new GUI();

    // load assets
    this.assetLoader = new AssetLoader();

    // load ui
    this.preloader = new Preloader();

    // create world
    this.world = new World();

    // create camera
    this.camera = new Camera();

    // create renderer
    this.renderer = new Renderer();

    // create game loop
    this.loop = new Loop();

    // create resize handler for responsiveness
    this.resize = new Resize();
  }
}
