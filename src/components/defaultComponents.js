// @flow

import Container from './Container';
import Footer, { FooterCaption, FooterContainer, FooterCount } from './Footer';
import Header, { HeaderButton } from './Header';
import { Navigation, NavigationItem } from './Navigation';
import View from './View';

export type CarouselComponents = {
  Container: typeof Container,
  Footer: typeof Footer,
  FooterContainer: typeof FooterContainer,
  FooterCaption: typeof FooterCaption,
  FooterCount: typeof FooterCount,
  Header: typeof Header,
  HeaderButton: typeof HeaderButton,
  Navigation: typeof Navigation,
  NavigationItem: typeof NavigationItem,
  View: typeof View,
};

export const components: CarouselComponents = {
  Container: Container,
  Footer: Footer,
  FooterContainer: FooterContainer,
  FooterCaption: FooterCaption,
  FooterCount: FooterCount,
  Header: Header,
  HeaderButton: HeaderButton,
  Navigation: Navigation,
  NavigationItem: NavigationItem,
  View: View,
};

export const defaultComponents = (providedComponents?: CarouselComponents) => ({
  ...components,
  ...providedComponents,
});
