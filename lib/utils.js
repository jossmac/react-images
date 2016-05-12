'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports['default'] = {
	canUseDOM: canUseDOM
};
module.exports = exports['default'];