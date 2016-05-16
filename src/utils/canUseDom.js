// Return true if window + document

module.exports = !!(
	typeof window !== 'undefined'
	&& window.document
	&& window.document.createElement
);
