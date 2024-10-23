import { Shape } from './shape.js';

import InfinitySVG from './infinity.svg';

export default class InfinityShape extends Shape {
  /** @param {number} color - Hexidecimal color */
  constructor(color) {
    super(InfinitySVG, color);
  }
}
