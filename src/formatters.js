// @flow

// NOTE: props aren't used by default for some getters but consumers may need
// them, this needs to be reflected in the flow type.

/* eslint-disable no-unused-vars */

import type { ViewsType } from './types';

type LabelProps = { currentIndex: number, views: ViewsType };

// ==============================
// Navigation
// ==============================

/* ARIA label for the next button */
function getNextLabel({ currentIndex, views }: LabelProps): string {
  return `Show image ${currentIndex + 2} of ${views.length}`;
}

/* ARIA label for the previous button */
function getPrevLabel({ currentIndex, views }: LabelProps): string {
  return `Show image ${currentIndex} of ${views.length}`;
}

/* HTML title for the next button */
function getNextTitle(props: Object): string {
  return 'Next (right arrow)';
}

/* HTML title for the previous button */
function getPrevTitle(props: Object): string {
  return 'Previous (left arrow)';
}

// ==============================
// Pagination
// ==============================

/* ARIA label for the page next button */
function getPageNextLabel({
  currentIndex,
  pageCount,
  views,
}: LabelProps): string {
  const viewOffset = views.length - (currentIndex + 1);
  return `Next ${Math.min(pageCount, viewOffset)} images`;
}

/* ARIA label for the page previous button */
function getPagePrevLabel({
  currentIndex,
  pageCount,
  views,
}: LabelProps): string {
  const viewOffset = views.length - (currentIndex + 1);
  return `Previous ${Math.min(pageCount, viewOffset)} images`;
}

/* HTML title for the page next button */
const getPageNextTitle = getPageNextLabel;

/* HTML title for the page previous button */
const getPagePrevTitle = getPagePrevLabel;

// ==============================
// Header
// ==============================

type FullscreenProps = { isFullscreen: boolean };

/* ARIA label for the close button */
function getCloseLabel(props: Object): string {
  return 'Close (esc)';
}
/* ARIA label for the fullscreen button */
function getFullscreenLabel({ isFullscreen }: FullscreenProps): string {
  return isFullscreen ? 'Exit fullscreen (f)' : 'Enter fullscreen (f)';
}

// ==============================
// View
// ==============================

/* alt text for each image in the carousel */
function getAltText({ data, index }): string {
  if (data.caption) return data.caption;

  return `Image ${index + 1}`;
}

// ==============================
// Exports
// ==============================

export default {
  getAltText,
  getCloseLabel,
  getFullscreenLabel,
  getNextLabel,
  getNextTitle,
  getPageNextLabel,
  getPageNextTitle,
  getPagePrevLabel,
  getPagePrevTitle,
  getPrevLabel,
  getPrevTitle,
};
