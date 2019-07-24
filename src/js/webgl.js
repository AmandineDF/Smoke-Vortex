//--------------- IMPORTS ---------------//
import /* className */ from /* "./filename" */;
import { /* variables you want to import */ } from /* "./filename" */;


//--------------- CODE ---------------//
// LIBRARIES
const THREE = require("three");

//IMAGES & TEXTURES
const someImage = require("../images/texture/image.png");
const someTexture = new THREE.TextureLoader().load(someImage);

//SCENE
class WebglClass {
  constructor() {
    //SCENE
    this.scene = new THREE.Scene();

    //CAMERA
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );
    this.camera.position.z = 10;

    //RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.domElement.classList.add("canvas3D");
    document.body.appendChild( this.renderer.domElement );

    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    //LIGHTS
    this.light = new THREE.PointLight(0xffe0e0, 3, 100);
    this.light.position.set(0, 15, 2);
    this.scene.add(this.light);

    //OBJECTS
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.cube );

    //CLOCK
    this.clock = new THREE.Clock();
  };

  //RENDER
  render(){
    var delta = this.clock.getDelta();

    this.cube.rotation.x += (Math.PI / 180) * 10 * delta;
    this.cube.rotation.y += (Math.PI / 180) * 10 * delta;

    this.renderer.render(this.scene, this.camera);
    //if not called in script.js
    //requestAnimationFrame( render );
  }
};


//--------------- EXPORTS ---------------//
export {/* variables you want to export */};
export default /* WebglClass */;