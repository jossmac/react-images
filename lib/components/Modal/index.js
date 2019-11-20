'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Gateway = require('./Gateway');

Object.defineProperty(exports, 'ModalGateway', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Gateway).default;
  }
});

var _Modal = require('./Modal');

Object.defineProperty(exports, 'Modal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Modal).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }