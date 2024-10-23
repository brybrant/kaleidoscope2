import { Graphics } from 'pixi.js';

export class Shape extends Graphics {
  /**
   * Create an SVG shape with viewBox `-512 -512 1024 1024`
   * @param {string} svg - SVG
   * @param {number} color - Hexidecimal color
   */
  constructor(svg, color) {
    super();

    this.svg(svg);

    this.stroke({
      cap: 'square',
      color: color,
      width: 16,
    });
  }
}
