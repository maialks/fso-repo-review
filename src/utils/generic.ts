import { Range } from '../types';

export function addAlphaChannel(hex: string, alpha: Range<0, 101>): string {
  let hexAlpha = Math.round((alpha / 100) * 255).toString(16);
  if (hexAlpha.length === 1) hexAlpha += '0';
  return `${hex}${hexAlpha}`;
}
