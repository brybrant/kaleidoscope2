import { Shape } from './shape.js';

import Pentagon2SVG from './pentagon2.svg';

export default class Pentagon2Shape extends Shape {
  /** @param {number} color - Hexidecimal color */
  constructor(color) {
    super(Pentagon2SVG, color);
  }
}
