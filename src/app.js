import './app.scss';

import { Application, Container, DEG_TO_RAD, Graphics } from 'pixi.js';

import DiamondShape from './shapes/diamond.js';
import FlowerShape from './shapes/flower.js';
import InfinityShape from './shapes/infinity.js';
import PentagonShape from './shapes/pentagon.js';
import Pentagon2Shape from './shapes/pentagon2.js';
import SquareShape from './shapes/square.js';
import StarShape from './shapes/star.js';

import GitHubSVG from '../node_modules/@brybrant/svg-icons/GitHub.svg';

const main = document.createElement('main');

const title = 'KALEIDOSCOPE';

const h1 = document.createElement('h1');

for (let i = 0; i < title.length; i++) {
  const letter = title.charAt(i);

  h1.innerHTML += `<span class='letter-${i}'>${letter}</span>`;
}

main.appendChild(h1);

const githubLink = document.createElement('a');
githubLink.className = 'button';
githubLink.href = 'https://github.com/brybrant/kaleidoscope2';
githubLink.target = '_blank';
githubLink.innerHTML = `${GitHubSVG}View Source`;
main.appendChild(githubLink);

document.body.appendChild(main);

import colors from './colors.module.scss';

for (const [color, value] of Object.entries(colors)) {
  colors[color] = Number(value);
}

const background = document.getElementById('background');

const size = 1024;
const size2 = size / 2;
const size4 = size / 4;
const size8 = size / 8;
const size16 = size / 16;
const size32 = size / 32;

const root2 = Math.sqrt(2);

(async () => {
  const app = new Application();

  await app.init({
    antialias: true,
    height: size,
    preference: 'webgpu',
    resolution: window.devicePixelRatio,
    width: size,
  });

  const kaleidoscope = new Container();

  for (let i = 0; i < 12; i++) {
    const odd = i % 2 === 1;

    const mask = new Graphics();

    // Create mask
    const startAngle = -105 * DEG_TO_RAD;
    const stepAngle = 30 * DEG_TO_RAD;

    mask.moveTo(size2, size2);
    mask.arc(
      size2,
      size2,
      size2 * root2,
      startAngle + stepAngle * i,
      startAngle + stepAngle * (i + 1),
    );
    mask.closePath();
    mask.fill({ color: 0 });

    // Create segment
    const segment = new Container();
    const segmentBackground = new Graphics();

    segmentBackground.rect(0, 0, size, size);
    segmentBackground.fill({ color: colors.primaryDarker });
    segment.addChild(segmentBackground);

    // Flower
    const segmentFlower = new FlowerShape(colors.secondaryDarker);
    segmentFlower.position.set(size2, size4);
    segment.addChild(segmentFlower);

    // Infinity 1
    const segmentInfinity1 = new InfinityShape(colors.primaryMedium);
    segmentInfinity1.position.set(size2, size4 + size16 + size32);
    segment.addChild(segmentInfinity1);

    // Infinity 2
    const segmentInfinity2 = new InfinityShape(colors.primaryMedium);
    segmentInfinity2.position.set(size2, size32);
    segmentInfinity2.angle = 90;
    segment.addChild(segmentInfinity2);

    // Square
    const segmentSquare = new SquareShape(colors.secondaryMedium);
    segmentSquare.position.set(size2, size4 + size8);
    segment.addChild(segmentSquare);

    // Diamond
    const segmentDiamond = new DiamondShape(colors.secondaryMedium);
    segmentDiamond.position.set(size2, size8 - size16);
    segment.addChild(segmentDiamond);

    // Pentagon 1
    const segmentPentagon1 = new PentagonShape(colors.primaryBright);
    segmentPentagon1.position.set(size2, size2 - size8);
    segmentPentagon1.angle = 36;
    segment.addChild(segmentPentagon1);

    // Pentagon 2
    const segmentPentagon2 = new Pentagon2Shape(colors.primaryBright);
    segmentPentagon2.position.set(size2, -size16 - size32);
    segmentPentagon2.angle = 144;
    segment.addChild(segmentPentagon2);

    // Star
    const segmentStar = new StarShape(colors.primaryBright);
    segmentStar.position.set(size2, size2 - size32);
    segment.addChild(segmentStar);

    // Segment settings
    segment.pivot.set(size2, size2);
    segment.position.set(size2, size2);

    segment.scale.x = (odd ? -1 : 1) * root2;
    segment.scale.y = root2;

    segment.angle = 30 * i;

    kaleidoscope.addChild(mask);

    segment.mask = mask;

    kaleidoscope.addChild(segment);

    app.ticker.add(() => {
      const clockwise = performance.now() * 0.01;
      const counterClockwise = clockwise * -1;

      segmentFlower.angle = clockwise % 360;
      segmentInfinity1.angle = (90 + clockwise) % 360;
      segmentDiamond.angle = clockwise % 360;
      segmentPentagon1.angle = (36 + clockwise) % 360;

      segmentInfinity2.angle = counterClockwise % 360;
      segmentSquare.angle = counterClockwise % 360;
      segmentPentagon2.angle = (144 + counterClockwise) % 360;
      segmentStar.angle = counterClockwise % 360;
    });
  }

  kaleidoscope.pivot.set(size2, size2);
  kaleidoscope.position.set(size2, size2);

  kaleidoscope.angle = 15;

  app.stage.addChild(kaleidoscope);

  background.appendChild(app.canvas);
})();
