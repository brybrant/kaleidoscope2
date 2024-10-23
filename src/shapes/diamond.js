import { Shape } from './shape.js';

import DiamondSVG from './diamond.svg';

export default class DiamondShape extends Shape {
  /** @param {number} color - Hexidecimal color */
  constructor(color) {
    super(DiamondSVG, color);
  }
}
