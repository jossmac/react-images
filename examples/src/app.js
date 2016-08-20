import React from 'react';
import { render } from 'react-dom';
import Gallery from './components/Gallery';
import Lightbox from 'react-images';

function capitalizeFirstLetter (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const IMAGE_NAMES = ['cat', 'cats', 'chameleon', 'dog', 'ducks', 'goat', 'ostrich', 'pigeon', 'pigs', 'seagulls', 'wasp', 'yawn'];
const IMAGE_MAP = IMAGE_NAMES.map(img => ({
	src: `./images/800-${img}.jpg`,
	thumbnail: `./images/thumbnail-${img}.jpg`,
	srcset: [
		`./images/1024-${img}.jpg 1024w`,
		`./images/800-${img}.jpg 800w`,
		`./images/500-${img}.jpg 500w`,
		`./images/320-${img}.jpg 320w`,
	],
	caption: capitalizeFirstLetter(img),
}));

render(
	<div>
		<h3>Default options</h3>
		<p style={{ marginBottom: 40 }}>Use your keyboard to navigate <kbd>left</kbd> <kbd>right</kbd> <kbd>esc</kbd> &mdash; Also, try resizing your browser window.</p>
		<Gallery images={IMAGE_MAP} />
		<p>Images courtesy of <a href="http://gratisography.com/" target="_blank">Gratisography</a></p>

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
