import React from 'react';
import { render } from 'react-dom';
import Gallery from './components/Gallery';

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

	return `https://images.unsplash.com/photo-${id}?dpr=1&auto=format&crop=faces&fit=crop&${dimensions}`;
}

// Unsplash images from the "Spirit Animals" collection
// https://unsplash.com/collections/158825/spirit-animals

const DEFAULT_IMAGES = [
	{ id: '1470619549108-b85c56fe5be8', caption: <span><a href="https://unsplash.com/photos/SYzUF6XcWBY" target="_blank">Flamingo</a> by Alan Emery</span>, orientation: 'square', useForDemo: true },
	{ id: '1471079502516-250c19af6928', caption: <span><a href="https://unsplash.com/photos/GIpGxe2_cT4" target="_blank">Turtle</a> by Jeremy Bishop</span>, orientation: 'landscape', useForDemo: true },
	{ id: '1454023492550-5696f8ff10e1', caption: <span><a href="https://unsplash.com/photos/LmVSKeDy6EA" target="_blank">Tiger</a> by Jessica Weiller</span>, orientation: 'landscape', useForDemo: true },
	{ id: '1470854989922-5be2f7456d78', caption: <span><a href="https://unsplash.com/photos/GXMr7BadXQo" target="_blank">Hedgehog</a> by Piotr Łaskawski</span>, orientation: 'landscape', useForDemo: true },
	{ id: '1470317596697-cbdeda56f999', caption: <span><a href="https://unsplash.com/photos/XgF9e93Tkt0" target="_blank">Ladybug</a> by Michel Bosma</span>, orientation: 'landscape', useForDemo: true },
	{ id: '1471101173712-b9884175254e', caption: <span><a href="https://unsplash.com/photos/5oRzZU5uwSM" target="_blank">Dragonfly</a> by Pedro Lastra</span>, orientation: 'square' },
	{ id: '1455970022149-a8f26b6902dd', caption: <span><a href="https://unsplash.com/photos/a7bdqjeG6M4" target="_blank">Cat</a> by Mona Magnussen</span>, orientation: 'square' },
	{ id: '1471127432458-65206be149c9', caption: <span><a href="https://unsplash.com/photos/Kpgt4pl03O0" target="_blank">Deer</a> by Ernesto Velázquez</span>, orientation: 'landscape' },
	{ id: '1470777639313-60af88918203', caption: <span><a href="https://unsplash.com/photos/GNUcUx-iObg" target="_blank">Koala</a> by Cris Saur</span>, orientation: 'landscape' },
	{ id: '1453550486481-aa4175b013ea', caption: <span><a href="https://unsplash.com/photos/WiSeaZ4E6ZI" target="_blank">Elephant</a> by Benjamin Pley</span>, orientation: 'landscape' },
];
const THUMBNAIL_IMAGES = [
	{ id: '1454991727061-be514eae86f7', caption: <span><a href="https://unsplash.com/photos/t20pc32VbrU" target="_blank">Hump Back Whale</a> by Thomas Kelley</span>, orientation: 'square', useForDemo: true },
	{ id: '1455717974081-0436a066bb96', caption: <span><a href="https://unsplash.com/photos/cmKPOUgdmWc" target="_blank">Deer</a> by Teddy Kelley</span>, orientation: 'landscape', useForDemo: true },
	{ id: '1460899960812-f6ee1ecaf117', caption: <span><a href="https://unsplash.com/photos/h13Y8vyIXNU" target="_blank">Walrus</a> by Jay Ruzesky</span>, orientation: 'landscape', useForDemo: true },
	{ id: '1456926631375-92c8ce872def', caption: <span><a href="https://unsplash.com/photos/I3C1sSXj1i8" target="_blank">Leopard</a> by Gwen Weustink</span>, orientation: 'landscape', useForDemo: true },
	{ id: '1452274381522-521513015433', caption: <span><a href="https://unsplash.com/photos/_snqARKTgoc" target="_blank">Mother and Cubs</a> by Adam Willoughby-Knox</span>, orientation: 'landscape', useForDemo: true },
	{ id: '1471145653077-54c6f0aae511', caption: <span><a href="https://unsplash.com/photos/n0feC_PWFdk" target="_blank">Dragonfly</a> by Boris Smokrovic</span>, orientation: 'landscape' },
	{ id: '1471005197911-88e9d4a7834d', caption: <span><a href="https://unsplash.com/photos/YOX8ZMTo7hk" target="_blank">Baby Crocodile</a> by Gaetano Cessati</span>, orientation: 'landscape' },
	{ id: '1470583190240-bd6bbde8a569', caption: <span><a href="https://unsplash.com/photos/emTCWiq2txk" target="_blank">Beetle</a> by Alan Emery</span>, orientation: 'landscape' },
	{ id: '1470688090067-6d429c0b2600', caption: <span><a href="https://unsplash.com/photos/xqjO-lx39B4" target="_blank">Scottish Highland Cow</a> by Ján Jakub Naništa</span>, orientation: 'landscape' },
	{ id: '1470742292565-de43c4b02b57', caption: <span><a href="https://unsplash.com/photos/DmOCkOnx-MQ" target="_blank">Cheetah</a> by Eric Knoll</span>, orientation: 'landscape' },
	// https://unsplash.com/photos/NUMlxTPsznM coyote?
];

render(
	<div>
		<div style={{ marginBottom: 40 }}>
			<p>Photos courtesy of <a href="https://unsplash.com/" target="_blank">Unsplash</a>. Use your keyboard to navigate <kbd>left</kbd> <kbd>right</kbd> <kbd>esc</kbd> &mdash; Also, try resizing your browser window.</p>
		</div>
		<h3>Default Options</h3>
		<Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
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
		}))} />

		<h3>With Thumbnails</h3>
		<Gallery images={THUMBNAIL_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
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
		}))} showThumbnails />

		<h3>Themed Lightbox</h3>
		<Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
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
		}))} theme={{
			arrow: { color: '#999' },
			close: { color: '#666' },
			container: { background: 'rgba(255, 255, 255, 0.9)' },
			footer: {
				color: 'black',
				count: {
					color: 'rgba(0, 0, 0, 0.6)',
				},
			},
		}} />
	</div>,
	document.getElementById('example')
);
