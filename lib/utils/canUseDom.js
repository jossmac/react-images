// Return true if window + document

'use strict';

module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);