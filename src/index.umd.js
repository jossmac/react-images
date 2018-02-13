// This file exists as an entry point for bundling our umd builds.
// Both in rollup and in webpack, umd builds built from es6 modules are not
// compatible with mixed imports (which exist in index.js)
// This file does away with named imports in favor of a single export default.

import Carousel from './components/Carousel';
import { default as ModalGateway } from './components/Modal/Gateway';
import { default as Modal } from './components/Modal/Modal';
import { components } from './components/defaultComponents';

Carousel.components = components;
Carousel.Modal = Modal;
Carousel.ModalGateway = ModalGateway;

export default Carousel;
