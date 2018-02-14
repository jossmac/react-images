// @flow
// @jsx glam
import glam from 'glam';

export function isTouch() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}
