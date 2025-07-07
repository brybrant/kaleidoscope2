export const rad360 = Math.PI * 2;

export const rad120 = Math.PI / 1.5;

export const rad60 = Math.PI / 3;

export const rad36 = Math.PI / 5;

const rad30 = Math.PI / 6;

const rad15 = Math.PI / 12;

export const offsetX = Math.cos(rad15);

export const offsetY = Math.sin(rad15);

export const viewBox = 256;

const clipPaths = [];

for (let i = 0; i < 3; i++) {
  const clipPath = new Path2D();

  clipPath.moveTo(0, 0);
  clipPath.arc(0, 0, viewBox * 2, i * rad30, (i + 1) * rad30);
  clipPath.closePath();

  clipPaths[i] = clipPath;
}

export { clipPaths };
