// @flow

import Container from './Container';
import Footer, { FooterCaption, FooterCount } from './Footer';
import Header, { HeaderClose, HeaderFullscreen } from './Header';
import { Navigation, NavigationPrev, NavigationNext } from './Navigation';
import View from './View';

export type CarouselComponents = {
  Container: typeof Container,
  Footer: typeof Footer,
  FooterCaption: typeof FooterCaption,
  FooterCount: typeof FooterCount,
  Header: typeof Header,
  HeaderClose: typeof HeaderClose,
  HeaderFullscreen: typeof HeaderFullscreen,
  Navigation: typeof Navigation,
  NavigationPrev: typeof NavigationPrev,
  NavigationNext: typeof NavigationNext,
  View: typeof View,
};

export const components: CarouselComponents = {
  Container: Container,
  Footer: Footer,
  FooterCaption: FooterCaption,
  FooterCount: FooterCount,
  Header: Header,
  HeaderClose: HeaderClose,
  HeaderFullscreen: HeaderFullscreen,
  Navigation: Navigation,
  NavigationPrev: NavigationPrev,
  NavigationNext: NavigationNext,
  View: View,
};

export const defaultComponents = (providedComponents?: CarouselComponents) => ({
  ...components,
  ...providedComponents,
});
