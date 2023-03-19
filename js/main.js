import * as THREE from 'three';
import '../style.css'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { fitCameraToObject, setupScene } from "./scene";
import { renderSVG } from "./svg";
import { svg } from "./map";
import { newsvg } from "./newmap"
/**
 * SVGLoader : 
 * import svg, make them to a mesh as it is  
 * doesn't need blender to make gltf 
 */

const defaultExtrusion = 1;
const app = document.querySelector("#app");
const extrusionInput = document.querySelector("#input");
const focusButton = document.querySelector("#focus");
const { scene, camera, controls } = setupScene(app);
// const scene = setupScene(app);
const { object, update } = renderSVG(defaultExtrusion, newsvg);
scene.add(object);


extrusionInput.addEventListener("input", () => {
  update(Number(extrusionInput.value));
});
extrusionInput.value = defaultExtrusion;

focusButton.addEventListener("click", () => {
  fitCameraToObject(camera, object, controls);
});

