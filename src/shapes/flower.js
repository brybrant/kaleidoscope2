import { Shape } from './shape.js';

import FlowerSVG from './flower.svg';

export default class FlowerShape extends Shape {
  /** @param {number} color - Hexidecimal color */
  constructor(color) {
    super(FlowerSVG, color);
  }
}
