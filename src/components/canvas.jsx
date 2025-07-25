import { onCleanup, onMount } from 'solid-js';

import {
  flower,
  infinity,
  square,
  diamond,
  pentagon1,
  pentagon2,
  star,
} from '../shapes.js';
import * as constants from '../constants.js';
import colors from '../colors.module.scss';

/** @type {CanvasRenderingContext2D} */
let context1;

/** @type {CanvasRenderingContext2D} */
let context2;

/** @type {CanvasRenderingContext2D} */
let context3;

/** @type {CanvasRenderingContext2D} */
let context4;

/**
 * Create a shape
 * @param {Path2D} path
 * @param {Number} offset
 * @param {Number} rotation
 * @param {String} strokeStyle
 */
function shape(path, offset, rotation, strokeStyle) {
  context1.save();

  context1.translate(offset * constants.offsetX, offset * constants.offsetY);
  context1.rotate(rotation);

  context1.strokeStyle = strokeStyle;

  context1.stroke(path);

  context1.restore();
}

export default () => {
  /** @type {HTMLCanvasElement} */
  let canvas1;

  /** @type {HTMLCanvasElement} */
  let canvas2;

  /** @type {HTMLCanvasElement} */
  let canvas3;

  /** @type {HTMLCanvasElement} */
  let canvas4;

  function resize() {
    canvas1.width =
      canvas2.width =
      canvas3.width =
      canvas4.width =
        window.innerWidth * (window.devicePixelRatio / 2);

    canvas1.height =
      canvas2.height =
      canvas3.height =
      canvas4.height =
        window.innerHeight * (window.devicePixelRatio / 2);

    const radius = Math.max(canvas1.width, canvas1.height) * Math.SQRT1_2;

    const scale = radius / constants.viewBox;

    context1.scale(scale, scale);
    context1.fillStyle = colors.primaryDarker;
    context1.lineCap = context1.lineJoin = 'round';
    context1.lineWidth = 16;
  }

  /** @type {Number} */
  let rotation = 0;

  /** @type {Number} */
  let frame;

  /** @type {Number} */
  let lastTimestamp = 0;

  /** @param {Number} timestamp */
  function animate(timestamp) {
    context1.fillRect(
      -constants.viewBox,
      -constants.viewBox,
      constants.viewBox * 3,
      constants.viewBox * 3,
    );

    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    for (let i = 0; i < 3; i++) {
      context1.save();

      context1.clip(constants.clipPaths[i]);

      context1.rotate(Math.ceil(i / 2) * constants.rad60);
      if (i % 2 === 1) context1.scale(1, -1);

      shape(flower, 256, rotation, colors.secondaryDarker);

      shape(infinity, 160, rotation, colors.primaryMedium);

      shape(infinity, 512, constants.rad120 - rotation, colors.primaryMedium);

      shape(square, 160, -rotation, colors.secondaryMedium);

      shape(diamond, 480, rotation, colors.secondaryMedium);

      shape(pentagon1, 120, constants.rad36 + rotation, colors.primaryBright);

      shape(pentagon2, 620, constants.rad60 - rotation, colors.primaryBright);

      shape(star, 28, rotation, colors.primaryBright);

      context1.restore();
    }

    const segment = context1.getImageData(0, 0, canvas1.width, canvas1.height);

    context2.putImageData(segment, 0, 0);
    context3.putImageData(segment, 0, 0);
    context4.putImageData(segment, 0, 0);

    rotation = (rotation + 15e-5 * deltaTime) % constants.rad360;

    frame = requestAnimationFrame(animate);
  }

  onMount(() => {
    context1 = canvas1.getContext('2d', { alpha: false });
    context2 = canvas2.getContext('2d', { alpha: false });
    context3 = canvas3.getContext('2d', { alpha: false });
    context4 = canvas4.getContext('2d', { alpha: false });

    resize();

    window.addEventListener('resize', resize);

    frame = requestAnimationFrame(animate);
  });

  onCleanup(() => {
    cancelAnimationFrame(frame);

    window.removeEventListener('resize', resize);
  });

  return (
    <>
      <canvas ref={canvas1} />
      <canvas ref={canvas2} />
      <canvas ref={canvas3} />
      <canvas ref={canvas4} />
    </>
  );
};
