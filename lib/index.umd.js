'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Carousel = require('./components/Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _Gateway = require('./components/Modal/Gateway');

var _Gateway2 = _interopRequireDefault(_Gateway);

var _Modal = require('./components/Modal/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _defaultComponents = require('./components/defaultComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file exists as an entry point for bundling our umd builds.
// Both in rollup and in webpack, umd builds built from es6 modules are not
// compatible with mixed imports (which exist in index.js)
// This file does away with named imports in favor of a single export default.

_Carousel2.default.ModalGateway = _Gateway2.default;
_Carousel2.default.Modal = _Modal2.default;
_Carousel2.default.carouselComponents = _defaultComponents.carouselComponents;
_Carousel2.default.modalComponents = _defaultComponents.modalComponents;
exports.default = _Carousel2.default;