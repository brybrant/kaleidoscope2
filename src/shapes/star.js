import { Shape } from './shape.js';

import StarSVG from './star.svg';

export default class StarShape extends Shape {
  /** @param {number} color - Hexidecimal color */
  constructor(color) {
    super(StarSVG, color);
  }
}
