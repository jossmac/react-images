'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalComponents = exports.carouselComponents = exports.Modal = exports.ModalGateway = undefined;

var _Gateway = require('./components/Modal/Gateway');

Object.defineProperty(exports, 'ModalGateway', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Gateway).default;
  }
});

var _Modal = require('./components/Modal/Modal');

Object.defineProperty(exports, 'Modal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Modal).default;
  }
});

var _defaultComponents = require('./components/defaultComponents');

Object.defineProperty(exports, 'carouselComponents', {
  enumerable: true,
  get: function get() {
    return _defaultComponents.carouselComponents;
  }
});
Object.defineProperty(exports, 'modalComponents', {
  enumerable: true,
  get: function get() {
    return _defaultComponents.modalComponents;
  }
});

var _Carousel = require('./components/Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Carousel2.default;