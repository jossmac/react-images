function makeUnsplashSrc (id) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}
function makeUnsplashSrcSet (id, size) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`;
}
function makeUnsplashThumbnail (id, orientation = 'landscape') {
	const dimensions = orientation === 'square'
		? 'w=300&h=300'
		: 'w=240&h=159';

	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`;
}
function imageMap (images) {
	return images.map(({ caption, id, orientation, useForDemo }) => ({
		src: makeUnsplashSrc(id),
		thumbnail: makeUnsplashThumbnail(id, orientation),
		srcset: [
			makeUnsplashSrcSet(id, 1024),
			makeUnsplashSrcSet(id, 800),
			makeUnsplashSrcSet(id, 500),
			makeUnsplashSrcSet(id, 320),
		],
		caption,
		orientation,
		useForDemo,
	}));
};

module.exports = { imageMap };
