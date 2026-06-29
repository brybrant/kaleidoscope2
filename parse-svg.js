import { basename } from 'node:path';

import { glob, mkdir, readFile, writeFile } from 'node:fs/promises';

import { JSDOM } from 'jsdom';

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

/**
 * - `[0]` = X
 * - `[1]` = Y
 * @typedef {[number, number]} Vec2
 */

/**
 * - `[0]` = Start point
 * - `[1]` = End point
 * @typedef {[Vec2, Vec2]} LineCurveCustom
 */

/**
 * - `[0]` = Start point
 * - `[1]` = Control point 1
 * - `[2]` = Control point 2
 * - `[3]` = End point
 * @typedef {[Vec2, Vec2, Vec2, Vec2]} CubicBezierCurveCustom
 */

/**
 * @typedef {(LineCurveCustom|CubicBezierCurveCustom)[]} CurvesCustom
 */

/**
 * - `[0]` = Shape curves
 * - `[1]` = Shape holes *(optional)*
 * @typedef {[CurvesCustom[], [CurvesCustom[]]]} ShapeCustom
 */

/**
 * @typedef {import('three').Shape} Shape
 * @typedef {import('three').Path} Path
 */

const jsdom = new JSDOM();

/** `SVGLoader.parse` uses `DOMParser` browser API */
globalThis.DOMParser = jsdom.window.DOMParser;

const svgLoader = new SVGLoader();

await mkdir('./src/shapes', { recursive: true });

/** @param {number} number */
const threeDecimals = (number) => Math.round(number * 1e3) / 1e3;

/** @param {Path|Shape} shape */
function createShapeData(shape) {
  /** @type {CurvesCustom[]} */
  const curves = [];

  for (const curve of shape.curves) {
    /** @type {(LineCurveCustom|CubicBezierCurveCustom)[]} */
    const curveData = [];

    switch (curve.type) {
      case 'LineCurve':
        curveData.push(
          [threeDecimals(curve.v1.x), threeDecimals(curve.v1.y)],
          [threeDecimals(curve.v2.x), threeDecimals(curve.v2.y)],
        );
        break;

      case 'CubicBezierCurve':
        curveData.push(
          [threeDecimals(curve.v0.x), threeDecimals(curve.v0.y)],
          [threeDecimals(curve.v1.x), threeDecimals(curve.v1.y)],
          [threeDecimals(curve.v2.x), threeDecimals(curve.v2.y)],
          [threeDecimals(curve.v3.x), threeDecimals(curve.v3.y)],
        );
        break;

      default:
        console.error(`Unrecognized curve type: "${curve.type}"`);
    }

    curves.push(curveData);
  }

  /** @type {ShapeCustom} */
  const shapeData = [curves];

  if (shape.type === 'Path' || shape.holes.length < 1) return shapeData;

  const holes = [];

  for (const hole of shape.holes) holes.push(...createShapeData(hole));

  shapeData.push(holes);

  return shapeData;
}

/** @param {Shape[]} shapes */
function createExport(shapes) {
  /** @type {ShapeCustom[]} */
  const data = [];

  for (const shape of shapes) data.push(createShapeData(shape));

  return JSON.stringify(data);
}

/** @type {Promise<void>[]} */
const svgPromises = [];

for await (const svgFile of glob('./shapes/*.svg')) {
  const outputName = `./src/shapes/${basename(svgFile, '.svg')}.js`;

  svgPromises.push(
    readFile(svgFile, 'utf8').then((data) => {
      const { paths } = svgLoader.parse(data);

      /** Every SVG in this project contains only one path */
      const path = paths[0];

      // const shapes = SVGLoader.createShapes(path);
      const shapes = path.toShapes();

      const exportData = [
        `/* eslint-disable prettier/prettier */`,
        `export default ${createExport(shapes)};`,
      ];

      return writeFile(outputName, exportData.join('\n'));
    }),
  );
}

Promise.all(svgPromises).then(() => {
  console.log('Converted SVGs to THREE shape instructions!');
});
