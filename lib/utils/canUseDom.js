'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// Return true if window + document

exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);