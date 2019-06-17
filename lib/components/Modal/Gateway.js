'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactTransitionGroup = require('react-transition-group');

require('./Modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FirstChild = function FirstChild(_ref) {
  var children = _ref.children;
  return _react.Children.toArray(children)[0] || null;
};

var ModalGateway = function (_Component) {
  _inherits(ModalGateway, _Component);

  function ModalGateway() {
    _classCallCheck(this, ModalGateway);

    return _possibleConstructorReturn(this, (ModalGateway.__proto__ || Object.getPrototypeOf(ModalGateway)).apply(this, arguments));
  }

  _createClass(ModalGateway, [{
    key: 'render',
    value: function render() {
      if (typeof window === 'undefined') return null;
      var _props = this.props,
          target = _props.target,
          children = _props.children;

      return (0, _reactDom.createPortal)(_react2.default.createElement(_reactTransitionGroup.TransitionGroup, { component: FirstChild, children: children }), target);
    }
  }]);

  return ModalGateway;
}(_react.Component);

ModalGateway.defaultProps = {
  target: typeof window !== 'undefined' ? document.body : null
};
exports.default = ModalGateway;