/**
	Bind multiple component methods:

	* @param {this} context
	* @param {Array} functions

	constructor() {
		...
		bindFunctions.call(this, ['handleClick', 'handleOther']);
	}
*/

module.exports = function bindFunctions (functions) {
	functions.forEach(f => (this[f] = this[f].bind(this)));
};
