import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import spline from "./spline.js";

import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";

const w = window.innerWidth;
const h = window.innerHeight;

// Scene setup: create scene and add fog for depth effect
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.4);

// Camera setup: perspective camera positioned along z-axis
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

// Renderer setup: WebGL renderer attached to document body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// OrbitControls: enable camera orbiting with damping for smoothness
const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;
ctrls.dampeningFactor = 0.03;

// Post-processing setup: RenderPass renders the scene, UnrealBloomPass adds bloom glow effect
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
// BloomPass configuration:
// threshold: luminance threshold to start bloom (lower means more bloom)
// strength: intensity of bloom glow
// radius: blur radius of bloom effect
bloomPass.threshold = 0.002;
bloomPass.strength = 3.5;
bloomPass.radius = 0;

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Create a line geometry from the spline points (not added to scene)
// This shows the raw spline path as a red line
const points = spline.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const line = new THREE.Line(geometry, material);
// scene.add(line);

// Create a tube geometry following the spline path
const tubeGeometry = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);

// Create edges geometry from the tube to highlight its wireframe structure
const edges = new THREE.EdgesGeometry(tubeGeometry, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
const tubeLine = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLine);

// Create multiple small wireframe boxes distributed along the spline tube
const numBoxes = 55;
const size = 0.075;
const boxGeometry = new THREE.BoxGeometry(size, size, size);
for (let i = 0; i < numBoxes; i += 1) {
  // Wireframe material for boxes
  const boxMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const box = new THREE.Mesh(boxGeometry, boxMat);
  // Position boxes evenly along the tube path with some randomness
  const p = (i / numBoxes + Math.random() * 0.1) % 1;
  const pos = tubeGeometry.parameters.path.getPointAt(p);
  pos.x += Math.random() - 0.4;
  pos.z += Math.random() - 0.4;
  box.position.copy(pos);
  // Random rotation for visual variety
  const rote = new THREE.Vector3(Math.random(), Math.random(), Math.random());
  box.rotation.set(rote.x, rote.y, rote.z);
  // Create edges geometry for the box wireframe with random hue color
  const edges = new THREE.EdgesGeometry(boxGeometry, 0.2);
  const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
  const lineMat = new THREE.LineBasicMaterial({ color});
  const boxLines = new THREE.LineSegments(edges, lineMat);
  boxLines.rotation.set(rote.x, rote.y, rote.z);
  boxLines.position.copy(pos);
  // Add only the edges to the scene for a stylized effect
  scene.add(boxLines);
}

// Hemisphere light to softly illuminate the scene
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

// Camera fly-through animation function
function updateCamera(t) {
  const time = t * 0.1;
  const looptime = 8 * 1000; // 8 seconds loop duration
  // Calculate normalized progress along the spline path [0,1]
  const p = (time % looptime) / looptime;
  // Get current position and look-ahead position on the spline
  const pos = tubeGeometry.parameters.path.getPointAt(p);
  const lookAt = tubeGeometry.parameters.path.getPointAt((p + 0.01) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

// Main animation loop
function animate(t = 0) {
  requestAnimationFrame(animate);
  updateCamera(t);
  // Use composer to render scene with bloom effect
  composer.render(scene, camera);
  ctrls.update();
}

animate();

// Handle window resize events to adjust camera and renderer
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
