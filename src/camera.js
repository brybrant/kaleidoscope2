import { OrthographicCamera } from 'three';

export class KaleidoCamera extends OrthographicCamera {
  /**
   * ```
   * ---------
   * | 0 | 1 |
   * ----×----
   * | 2 | 3 |
   * ---------
   * ```
   * - `×` = center (x = 0, y = 0)
   * - `0` = top left camera
   * - `1` = top right camera
   * - `2` = bottom left camera
   * - `3` = bottom right camera
   * @param {'right'|'left'} x - Which frustum plane to apply `x` to
   * @param {'top'|'bottom'} y - Which frustum plane to apply `y` to
   */
  constructor(x, y) {
    super(0, 0, 0, 0, -4, 4);

    /**
     * @param {number} width - Frustum width
     * @param {number} height - Frustum height
     */
    this.updateFrustum = (width, height) => {
      this[x] = width;
      this[y] = height;
      this.updateProjectionMatrix();
    };

    this.position.set(0, 0, -1);
    this.lookAt(0, 0, 0);
  }
}
