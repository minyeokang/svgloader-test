import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const setupScene = (container) => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //use regular webgl renderer 
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1e5 //1e5 means 1 × 105 == 10^5 = 100000
    );
    const ambientLight = new THREE.AmbientLight("#888888"); //equally
    const pointLight = new THREE.PointLight("#ffffff", 2, 800); //lightbulb

    const controls = new OrbitControls(camera, renderer.domElement);

    //actual rendering and controling 
    const animate = () => {
      renderer.render(scene, camera);
      controls.update();
  
      requestAnimationFrame(animate);
    };
  
    //sizing 
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.add(ambientLight, pointLight);
    camera.position.set(50,50,50)//x,y,z
    controls.enablePan = false;
  
    container.append(renderer.domElement); //use params 
    //resizing 
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();

    //returns scene so its accessible from main.js module 
    return { scene, camera, controls };
  };

  const fitCameraToObject = (camera, object, controls) => {
    const boundingBox = new THREE.Box3().setFromObject(object);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    const offset = 1.25;
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2)) * offset;
    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;
  
    controls.target = center;
    controls.maxDistance = cameraToFarEdge * 2;
    controls.minDistance = cameraToFarEdge * 0.5;
    controls.saveState();
    camera.position.z = cameraZ;
    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();
  };
  
  export { fitCameraToObject, setupScene };
//   export { setupScene }