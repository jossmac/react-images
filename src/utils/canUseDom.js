// Return true if window + document

export default !!(
	typeof window !== 'undefined'
	&& window.document
	&& window.document.createElement
);
