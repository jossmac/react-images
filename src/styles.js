// @flow

// Carousel
import { containerCSS } from './components/Container';
import { navigationCSS, navigationItemCSS } from './components/Navigation';
import { viewCSS } from './components/View';
import { headerCSS, headerButtonCSS } from './components/Header';
import {
  footerCSS,
  footerCaptionCSS,
  footerCountCSS,
} from './components/Footer';

// Modal
import {
  blanketCSS,
  dialogCSS,
  positionerCSS,
} from './components/Modal/styled';

type Props = { [key: string]: any };
type StyleDef = Props => Object;

export type Styles = {
  container: StyleDef,
  footer: StyleDef,
  footerCaption: StyleDef,
  footerCount: StyleDef,
  header: StyleDef,
  headerButton: StyleDef,
  navigation: StyleDef,
  navigationItem: StyleDef,
  view: StyleDef,

  blanket: StyleDef,
  dialog: StyleDef,
  positioner: StyleDef,
};
export type StylesConfig = $Shape<Styles>;
export type GetStyles = (string, Props) => {};

export const defaultStyles: Styles = {
  container: containerCSS,
  footer: footerCSS,
  footerCaption: footerCaptionCSS,
  footerCount: footerCountCSS,
  header: headerCSS,
  headerButton: headerButtonCSS,
  navigation: navigationCSS,
  navigationItem: navigationItemCSS,
  view: viewCSS,

  blanket: blanketCSS,
  dialog: dialogCSS,
  positioner: positionerCSS,
};

// Merge Utility
// Allows consumers to extend a base Carousel or Modal with additional styles

export function mergeStyles(source: Object, target: Object = {}) {
  // initialize with source styles
  const styles = { ...source };

  // massage in target styles
  Object.keys(target).forEach(key => {
    if (source[key]) {
      styles[key] = (rsCss, props) => {
        return target[key](source[key](rsCss, props), props);
      };
    } else {
      styles[key] = target[key];
    }
  });

  return styles;
}
