import {
  CubicBezierCurve,
  LineCurve,
  Path,
  Shape,
  ShapeGeometry,
  Vector2,
} from 'three';

import diamondData from './shapes/diamond.js';
import flowerData from './shapes/flower.js';
import infinity1Data from './shapes/infinity1.js';
import infinity2Data from './shapes/infinity2.js';
import pentagon1Data from './shapes/pentagon1.js';
import pentagon2Data from './shapes/pentagon2.js';
import squareData from './shapes/square.js';
import starData from './shapes/star.js';

/**
 * @typedef {import('../../parse-svg.js').Vec2} Vec2
 * @typedef {import('../../parse-svg.js').CurvesCustom} CurvesCustom
 * @typedef {import('../../parse-svg.js').ShapeCustom} ShapeCustom
 */

/** @param {CurvesCustom} curveDataArray */
function createCurves(curveDataArray) {
  /** @type {(LineCurve|CubicBezierCurve)[]} */
  const curves = [];

  for (const curveData of curveDataArray) {
    if (curveData.length === 2) {
      curves.push(
        new LineCurve(
          new Vector2(curveData[0][0], curveData[0][1]),
          new Vector2(curveData[1][0], curveData[1][1]),
        ),
      );
    } else {
      // curveData.length === 4
      curves.push(
        new CubicBezierCurve(
          new Vector2(curveData[0][0], curveData[0][1]),
          new Vector2(curveData[1][0], curveData[1][1]),
          new Vector2(curveData[2][0], curveData[2][1]),
          new Vector2(curveData[3][0], curveData[3][1]),
        ),
      );
    }
  }

  return curves;
}

/** @param {ShapeCustom[]} shapeDataArray */
function createShapeGeometry(shapeDataArray) {
  /** @type {Shape[]} */
  const shapes = [];

  for (const shapeData of shapeDataArray) {
    const shape = new Shape();

    shape.curves = createCurves(shapeData[0]);

    if (shapeData[1] === undefined) {
      shapes.push(shape);
      continue;
    }

    const holes = [];

    /** @type {[CurvesCustom[]]} */
    const holesDataArray = shapeData[1];

    for (const holeData of holesDataArray) {
      const hole = new Path();

      hole.curves = createCurves(holeData);

      holes.push(hole);
    }

    shape.holes = holes;

    shapes.push(shape);
  }

  return new ShapeGeometry(shapes);
}

export const diamondGeometry = createShapeGeometry(diamondData);
export const flowerGeometry = createShapeGeometry(flowerData);
export const infinity1Geometry = createShapeGeometry(infinity1Data);
export const infinity2Geometry = createShapeGeometry(infinity2Data);
export const pentagon1Geometry = createShapeGeometry(pentagon1Data);
export const pentagon2Geometry = createShapeGeometry(pentagon2Data);
export const squareGeometry = createShapeGeometry(squareData);
export const starGeometry = createShapeGeometry(starData);
