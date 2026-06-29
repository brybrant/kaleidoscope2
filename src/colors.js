import { Color } from 'three';

import {
  primaryBrightLong,
  primaryDarkerLong,
  primaryMediumLong,
  secondaryDarkerLong,
  secondaryMediumLong,
} from './colors.module.scss';

export const primaryBright = new Color(Number(primaryBrightLong));
export const primaryDarker = new Color(Number(primaryDarkerLong));
export const primaryMedium = new Color(Number(primaryMediumLong));
export const secondaryDarker = new Color(Number(secondaryDarkerLong));
export const secondaryMedium = new Color(Number(secondaryMediumLong));
