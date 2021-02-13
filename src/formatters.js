// @flow

// NOTE: props aren't used by default for some getters but consumers may need
// them, this needs to be reflected in the flow type.

/* eslint-disable no-unused-vars */

import type { ViewsType } from './types'

type LabelProps = { currentIndex: number, views: ViewsType }

// ==============================
// Navigation
// ==============================

/* ARIA label for the next button */
function getNextLabel({ currentIndex, views }: LabelProps): string {
  return `Show slide ${currentIndex + 2} of ${views.length}`
}

/* ARIA label for the previous button */
function getPrevLabel({ currentIndex, views }: LabelProps): string {
  return `Show slide ${currentIndex} of ${views.length}`
}

/* HTML title for the next button */
function getNextTitle(props: Object): string {
  return 'Next (right arrow)'
}

/* HTML title for the previous button */
function getPrevTitle(props: Object): string {
  return 'Previous (left arrow)'
}

// ==============================
// Header
// ==============================

type FullscreenProps = { isFullscreen: boolean }

/* ARIA label for the close button */
function getCloseLabel(props: Object): string {
  return 'Close (esc)'
}
/* ARIA label for the fullscreen button */
function getFullscreenLabel({ isFullscreen }: FullscreenProps): string {
  return isFullscreen ? 'Exit fullscreen (f)' : 'Enter fullscreen (f)'
}

// ==============================
// View
// ==============================

/* alt text for each image in the carousel */
function getAltText({ data, index }): string {
  if (data.alt) {
    if (typeof data.alt !== 'string') {
      console.error(`Image ${index + 1} had a non-string alt property, which will probably render incorrectly.\nInstead of a plain string it was `, data.alt)
    }

    return data.alt
  }

  if (data.caption) {
    if (typeof data.caption !== 'string') {
      console.warn(
        `Image ${
          index + 1
        } has a non-string caption, but no alt value provided. This will probably make the alt prop unintelligible for screen readers. Is this intentional?`,
      )
    }

    return data.caption
  }

  return `Image ${index + 1}`
}

// ==============================
// Exports
// ==============================

export default {
  getAltText,
  getNextLabel,
  getPrevLabel,
  getNextTitle,
  getPrevTitle,
  getCloseLabel,
  getFullscreenLabel,
}
