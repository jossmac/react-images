// @flow
// @jsx glam
import glam from 'glam';

export function paddingHorizontal(p: number) {
  return { paddingLeft: p, paddingRight: p };
}
export function paddingVertical(p: number) {
  return { paddingBottom: p, paddingTop: p };
}

export function isTouch() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}
