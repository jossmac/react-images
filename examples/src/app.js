import React from 'react';
import { render } from 'react-dom';
import Gallery from './components/Gallery';
import Lightbox from 'react-images';

function makeUnsplashSrc (id) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1600&h=1600`;
}
function makeUnsplashSrcSet (id, size) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`;
}
function makeUnsplashThumbnail (id) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=entropy&fit=crop&w=100&h=100`;
}

const IMAGE_NAMES = [
	{ id: '1471079502516-250c19af6928', caption: <span><a href="https://unsplash.com/photos/GIpGxe2_cT4" target="_blank">Turtle</a>, by Jeremy Bishop</span> },
	{ id: '1455970022149-a8f26b6902dd', caption: <span><a href="https://unsplash.com/photos/a7bdqjeG6M4" target="_blank">Cat</a>, by Mona Magnussen</span> },
	{ id: '1470317596697-cbdeda56f999', caption: <span><a href="https://unsplash.com/photos/XgF9e93Tkt0" target="_blank">Ladybug</a>, by Michel Bosma</span> },
	{ id: '1454023492550-5696f8ff10e1', caption: <span><a href="https://unsplash.com/photos/LmVSKeDy6EA" target="_blank">Tiger</a>, by Jessica Weiller</span> },
	{ id: '1470619549108-b85c56fe5be8', caption: <span><a href="https://unsplash.com/photos/SYzUF6XcWBY" target="_blank">Flamingo</a>, by Alan Emery</span> },
	{ id: '1458167072153-a2eb76d67c1c', caption: <span><a href="https://unsplash.com/photos/I4AEXHh00uo" target="_blank">Chimpanzee</a>, by Liz Bridges</span> },
	{ id: '1471101173712-b9884175254e', caption: <span><a href="https://unsplash.com/photos/5oRzZU5uwSM" target="_blank">Dragonfly</a>, by Pedro Lastra</span> },
	{ id: '1471127432458-65206be149c9', caption: <span><a href="https://unsplash.com/photos/Kpgt4pl03O0" target="_blank">Deer</a>, by Ernesto Velázquez</span> },
	{ id: '1470854989922-5be2f7456d78', caption: <span><a href="https://unsplash.com/photos/GXMr7BadXQo" target="_blank">Hedgehog</a>, by Piotr Łaskawski</span> },
	{ id: '1470777639313-60af88918203', caption: <span><a href="https://unsplash.com/photos/GNUcUx-iObg" target="_blank">Koala</a>, by Cris Saur</span> },
	{ id: '1453550486481-aa4175b013ea', caption: <span><a href="https://unsplash.com/photos/WiSeaZ4E6ZI" target="_blank">Elephant</a>, by Benjamin Pley</span> },
];
const IMAGE_MAP = IMAGE_NAMES.map(({ caption, id }) => ({
	src: makeUnsplashSrc(id),
	thumbnail: makeUnsplashThumbnail(id),
	srcset: [
		makeUnsplashSrcSet(id, 1024),
		makeUnsplashSrcSet(id, 800),
		makeUnsplashSrcSet(id, 500),
		makeUnsplashSrcSet(id, 320),
	],
	caption,
}));

render(
	<div>
		<h3>Default options</h3>
		<p style={{ marginBottom: 40 }}>Use your keyboard to navigate <kbd>left</kbd> <kbd>right</kbd> <kbd>esc</kbd> &mdash; Also, try resizing your browser window.</p>
		<Gallery images={IMAGE_MAP} />
		<p>Images courtesy of <a href="https://unsplash.com/" target="_blank">Unsplash</a></p>

		<h3>Without thumbnails</h3>
		<p style={{ marginBottom: 40 }}>Set <code>{"thumbnails={false}"}</code> to remove thumbnails</p>
		<Gallery images={IMAGE_MAP} thumbnails={false} />

		<h3>Paginated version</h3>
		<p style={{ marginBottom: 40 }}>The <code>thumbnails</code> prop can actually take a component as value<br /><code>{"thumbnails={Lightbox.Lightbox.PaginatedThumbnails}"}</code></p>
		<Gallery images={IMAGE_MAP} thumbnails={Lightbox.PaginatedThumbnails} />
		<p style={{ marginBottom: 20 }}>Note : PaginatedThumbnails has an offset prop to change the number of thumbnails to show around the current one.<br />
		<code>{"<Lightbox thumbnails={(props) => <PaginatedThumbnails {...props} offset={5} />} />"}</code>
		</p>
	</div>,
	document.getElementById('example')
);
