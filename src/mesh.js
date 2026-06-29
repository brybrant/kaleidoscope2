import { InstancedMesh, Object3D } from 'three';

import { rad360 } from './constants';

const dummy = new Object3D();

export class KaleidoMesh extends InstancedMesh {
  /**
   * Creates an instanced mesh. Each instance is rotated according to `count`
   * @param {import('three').BufferGeometry} geometry - Mesh geometry
   * @param {import('three').Material} material - Mesh material
   * @param {number} count - Number of instances
   */
  constructor(geometry, material, count) {
    super(geometry, material, count);

    const rotation = rad360 / count;

    for (let i = 0; i < count; i++) {
      dummy.rotation.z = rotation * i;
      dummy.updateMatrix();
      this.setMatrixAt(i, dummy.matrix);
    }
  }
}
