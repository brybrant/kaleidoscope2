import { Shape } from './shape.js';

import PentagonSVG from './pentagon.svg';

export default class PentagonShape extends Shape {
  /** @param {number} color - Hexidecimal color */
  constructor(color) {
    super(PentagonSVG, color);
  }
}
