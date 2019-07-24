//--------------- IMPORTS ---------------//
//import /* ClassName */ from /* "./filename" */;
//import { /* variables you want to import */ } from /* "./filename" */;
var THREE = require('three');
var OrbitControls = require('three-orbitcontrols');
var smokeImg = require('../assets/texture/smoke.png');


//--------------- CODE ---------------//

//IMPORT CLASSES
//let className = new ClassName(param1Value, param2Value);

var scene, sceneLight, portalLight, camera, renderer, clock, portalParticles = [], smokeParticles = [];

function initScene() {
  scene = new THREE.Scene();

  sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
  sceneLight.position.set(0, 0, 1);
  scene.add(sceneLight);

  portalLight = new THREE.PointLight(0x102c54, 35, 700, 2);
  portalLight.position.set(0, 0, 250);
  scene.add(portalLight);

  camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  scene.add(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;

  particleSetup();
}

function particleSetup() {
  let loader = new THREE.TextureLoader();

  loader.load(smokeImg, function(texture){
    portalGeo = new THREE.PlaneBufferGeometry(350, 350);
    portalMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true
    })

    smokeGeo = new THREE.PlaneBufferGeometry(2000, 1000);
    smokeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true
    })

    for(let p=880; p>250; p--) {
      let particle = new THREE.Mesh(portalGeo, portalMaterial);
      particle.position.set(
        0.5 * p * Math.cos((4 * p * Math.PI) / 180),
        0.5 * p * Math.sin((4 * p * Math.PI) / 180),
        0.1 * p
      );
      particle.rotation.z = Math.random() * 360;
      portalParticles.push(particle);
      scene.add(particle);
    }
  
    for(let p=0; p<40; p++) {
      let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
      particle.position.set(
        Math.random() * 1000 - 500,
        Math.random() * 400 - 200,
        25
      );
      particle.rotation.z = Math.random() * 360;
      particle.material.opacity = 0.4;
      portalParticles.push(particle);
      scene.add(particle);
    }

    clock = new THREE.Clock();

    update();

  });
}



//UPDATE EVERY OBJECTS
let update = function() {
  let delta = clock.getDelta();

  portalParticles.forEach(p => {
    p.rotation.z -= delta * 1.5;
  });

  smokeParticles.forEach(p => {
    p.rotation.z -= delta * 0.2;
  });

  if(Math.random() > 0.7) {
    portalLight.power = 350 + Math.random() * 500;
  }

  renderer.render(scene, camera);

  requestAnimationFrame(update);
};

window.onload = function() {

  initScene();

};


//--------------- EXPORTS ---------------//
//export {/* variables you want to export */};
//export default /* class you want to export */;