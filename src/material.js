import { ShaderMaterial } from 'three';

import { DoubleSide } from 'three';

import vertexShader from './glsl/vertex.glsl';
import fragmentShader from './glsl/fragment.glsl';

export class KaleidoMaterial extends ShaderMaterial {
  /**
   * @param {import('three').Color} color
   * @param {import('three').Plane[]} clippingPlanes
   */
  constructor(color, clippingPlanes) {
    super({
      clipping: true,
      clippingPlanes,
      defines: {
        USE_INSTANCING: '',
      },
      vertexShader,
      fragmentShader,
      side: DoubleSide,
      uniforms: {
        diffuse: { value: color },
      },
    });
  }
}
