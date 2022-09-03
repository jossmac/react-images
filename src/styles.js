// @flow

// Carousel
import { containerCSS } from './components/Container'
import { navigationCSS, navigationPrevCSS, navigationNextCSS } from './components/Navigation'
import { viewCSS } from './components/View'
import { headerCSS, headerCloseCSS, headerFullscreenCSS } from './components/Header'
import { footerCSS, footerCaptionCSS, footerCountCSS } from './components/Footer'

// Modal
import { blanketCSS, dialogCSS, positionerCSS } from './components/Modal/styled'

type Props = { [key: string]: any }
type StyleDef = Props => Object

export type CarouselStyles = {
  container: StyleDef,
  footer: StyleDef,
  footerCaption: StyleDef,
  footerCount: StyleDef,
  header: StyleDef,
  headerClose: StyleDef,
  headerFullscreen: StyleDef,
  navigation: StyleDef,
  navigationPrev: StyleDef,
  navigationNext: StyleDef,
  view: StyleDef,
}
export type ModalStyles = {
  blanket: StyleDef,
  dialog: StyleDef,
  positioner: StyleDef,
}
export type CarouselStylesConfig = $Shape<CarouselStyles>
export type ModalStylesConfig = $Shape<ModalStyles>

export const defaultCarouselStyles: CarouselStyles = {
  container: containerCSS,
  footer: footerCSS,
  footerCaption: footerCaptionCSS,
  footerCount: footerCountCSS,
  header: headerCSS,
  headerClose: headerCloseCSS,
  headerFullscreen: headerFullscreenCSS,
  navigation: navigationCSS,
  navigationPrev: navigationPrevCSS,
  navigationNext: navigationNextCSS,
  view: viewCSS,
}
export const defaultModalStyles: CarouselStyles = {
  blanket: blanketCSS,
  dialog: dialogCSS,
  positioner: positionerCSS,
}
