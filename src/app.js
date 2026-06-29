import { Group, Plane, Scene, Vector3, WebGLRenderer } from 'three';

import GitHubSVG from '@brybrant/svg-icons/GitHub.svg';

import {
  primaryBright,
  primaryDarker,
  primaryMedium,
  secondaryDarker,
  secondaryMedium,
} from './colors';

import {
  diamondGeometry,
  flowerGeometry,
  infinity1Geometry,
  infinity2Geometry,
  pentagon1Geometry,
  pentagon2Geometry,
  squareGeometry,
  starGeometry,
} from './geometries';

import { KaleidoCamera } from './camera';
import { KaleidoMaterial } from './material';
import { KaleidoMesh } from './mesh';

import { offsetX, offsetY, rad30, rad60, viewBox } from './constants';

/**
 * @param {KaleidoMesh} mesh
 * @param {number} distance
 * @param {number} layer
 */
function setPosition(mesh, distance, layer) {
  mesh.position.set(distance * -offsetX, distance * offsetY, layer);
}

// Clip planes
const cos30 = Math.cos(rad30);
const sin30 = Math.sin(rad30);

const clipPlanes = [
  [new Plane(new Vector3(0, 1, 0)), new Plane(new Vector3(-sin30, -cos30))],
  [
    new Plane(new Vector3(sin30, cos30)),
    new Plane(new Vector3(-cos30, -sin30)),
  ],
  [new Plane(new Vector3(cos30, sin30)), new Plane(new Vector3(-1, 0, 0))],
];

const iterations = clipPlanes.length;

// Cameras
const topLeftCamera = new KaleidoCamera('top', 'left');
const topRightCamera = new KaleidoCamera('top', 'right');
const bottomLeftCamera = new KaleidoCamera('bottom', 'left');
const bottomRightCamera = new KaleidoCamera('bottom', 'right');

const cameras = [
  topLeftCamera,
  topRightCamera,
  bottomLeftCamera,
  bottomRightCamera,
];

const renderer = new WebGLRenderer({
  alpha: false,
  antialias: true,
});

renderer.setClearColor(primaryDarker);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setScissorTest(true);

renderer.localClippingEnabled = true;

const scene = new Scene();

const kaleidoscopeGroup = new Group();

for (let i = 0; i < iterations; i++) {
  const kaleidoscopeSegment = new Group();

  const planes = clipPlanes[i];

  const primaryBrightMat = new KaleidoMaterial(primaryBright, planes);
  const primaryMediumMat = new KaleidoMaterial(primaryMedium, planes);
  const secondaryDarkerMat = new KaleidoMaterial(secondaryDarker, planes);
  const secondaryMediumMat = new KaleidoMaterial(secondaryMedium, planes);

  kaleidoscopeSegment.add(
    new KaleidoMesh(flowerGeometry, secondaryDarkerMat, 4),
    new KaleidoMesh(infinity1Geometry, primaryMediumMat, 2),
    new KaleidoMesh(infinity2Geometry, primaryMediumMat, 2),
    new KaleidoMesh(squareGeometry, secondaryMediumMat, 4),
    new KaleidoMesh(diamondGeometry, secondaryMediumMat, 2),
    new KaleidoMesh(pentagon1Geometry, primaryBrightMat, 5),
    new KaleidoMesh(pentagon2Geometry, primaryBrightMat, 5),
    new KaleidoMesh(starGeometry, primaryBrightMat, 3),
  );

  const kaleidoscopeSegmentChildren = kaleidoscopeSegment.children;

  // Flower
  setPosition(kaleidoscopeSegmentChildren[0], 256, 3);

  // Infinity1
  setPosition(kaleidoscopeSegmentChildren[1], 160, 2);

  // Infinity2
  setPosition(kaleidoscopeSegmentChildren[2], 480, 2);

  // Square
  setPosition(kaleidoscopeSegmentChildren[3], 160, 1);

  // Diamond
  setPosition(kaleidoscopeSegmentChildren[4], 480, 1);

  // Pentagon1
  setPosition(kaleidoscopeSegmentChildren[5], 120, 0);

  // Pentagon2
  setPosition(kaleidoscopeSegmentChildren[6], 620, 0);

  // Star
  setPosition(kaleidoscopeSegmentChildren[7], 28, 0);

  kaleidoscopeSegment.rotateZ(Math.ceil(i / 2) * -rad60);

  if (i % 2 === 1) kaleidoscopeSegment.scale.setY(-1);

  kaleidoscopeGroup.add(kaleidoscopeSegment);
}

scene.add(kaleidoscopeGroup);

/** @type {number} */
let halfWidth;
/** @type {number} */
let halfHeight;

/** Callback for `resize` window event */
function resize() {
  halfWidth = window.innerWidth / 2;
  halfHeight = window.innerHeight / 2;
  const aspect = window.innerWidth / window.innerHeight;

  if (window.innerWidth > window.innerHeight) {
    for (const camera of cameras) {
      camera.updateFrustum(viewBox / aspect, viewBox);
    }
  } else {
    for (const camera of cameras) {
      camera.updateFrustum(viewBox, viewBox * aspect);
    }
  }

  renderer.setSize(window.innerWidth, window.innerHeight, false);
}

resize();

window.addEventListener('resize', resize);

/** @type {number} */
let lastTimestamp = performance.now();

/** @param {number} timestamp */
function animate(timestamp) {
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  const rotation = 8e-5 * deltaTime;

  for (let i = 0; i < iterations; i++) {
    const kaleidoscopeSegment = kaleidoscopeGroup.children[i];
    const kaleidoscopeSegmentChildren = kaleidoscopeSegment.children;

    // Flower
    kaleidoscopeSegmentChildren[0].rotateZ(rotation);

    // Infinity1
    kaleidoscopeSegmentChildren[1].rotateZ(rotation);

    // Infinity2
    kaleidoscopeSegmentChildren[2].rotateZ(-rotation);

    // Square
    kaleidoscopeSegmentChildren[3].rotateZ(-rotation);

    // Diamond
    kaleidoscopeSegmentChildren[4].rotateZ(rotation);

    // Pentagon1
    kaleidoscopeSegmentChildren[5].rotateZ(-rotation);

    // Pentagon2
    kaleidoscopeSegmentChildren[6].rotateZ(rotation);

    // Star
    kaleidoscopeSegmentChildren[7].rotateZ(rotation);
  }

  renderer.setViewport(0, halfHeight, halfWidth, halfHeight);
  renderer.setScissor(0, halfHeight, halfWidth, halfHeight);
  renderer.render(scene, cameras[0]);
  renderer.setViewport(halfWidth, halfHeight, halfWidth, halfHeight);
  renderer.setScissor(halfWidth, halfHeight, halfWidth, halfHeight);
  renderer.render(scene, cameras[1]);
  renderer.setViewport(0, 0, halfWidth, halfHeight);
  renderer.setScissor(0, 0, halfWidth, halfHeight);
  renderer.render(scene, cameras[2]);
  renderer.setViewport(halfWidth, 0, halfWidth, halfHeight);
  renderer.setScissor(halfWidth, 0, halfWidth, halfHeight);
  renderer.render(scene, cameras[3]);

  requestAnimationFrame(animate);
}

document.body.appendChild(renderer.domElement);

requestAnimationFrame(animate);

document.body.insertAdjacentHTML(
  'beforeend',
  `<main>
    <h1>${'KALEIDOSCOPE'
      .split('')
      .map((e, i) => `<span class='letter-${i}'>${e}</span>`)
      .join('')}</h1>
    <a
      class='button'
      href='https://github.com/brybrant/kaleidoscope'
      target='_blank'
    >
      ${GitHubSVG}
    </a>
  </main>`,
);
