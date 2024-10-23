import { Shape } from './shape.js';

import SquareSVG from './square.svg';

export default class SquareShape extends Shape {
  /** @param {number} color - Hexidecimal color */
  constructor(color) {
    super(SquareSVG, color);
  }
}
