import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
})
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(ARButton.createButton(renderer));
renderer.xr.enabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const controls = new OrbitControls(camera, renderer.domElement);
// camera.position.z = -3;
controls.update();

const sunTex = new THREE.TextureLoader().load('textures/sun.jpeg');
const sun = new THREE.Mesh(new THREE.SphereGeometry(1.3), new THREE.MeshBasicMaterial({map : sunTex}));
scene.add(sun);
sun.position.z = -3

const earthTex = new THREE.TextureLoader().load('textures/earth.jpg');
const earth = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshBasicMaterial({map : earthTex}));
sun.add(earth);
earth.position.x = 4.5

// const moonTex = new THREE.TextureLoader().load('textures/moon.jpg');
// const moon = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({map : moonTex}));
// earth.add(moon);
// moon.position.x = 0.8

renderer.setAnimationLoop(()=>{
    sun.rotation.y += 0.005
    earth.rotation.y += 0.01
    renderer.render(scene, camera);
})
