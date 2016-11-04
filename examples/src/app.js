import React from 'react';
import { render } from 'react-dom';
import Gallery from './components/Gallery';
import images from './images';
import theme from './theme';
import { imageMap } from './utils';

render(
	<div>
		<div style={{ marginBottom: 40 }}>
			<p>Photos courtesy of <a href="https://unsplash.com/" target="_blank">Unsplash</a>. Use your keyboard to navigate <kbd>left</kbd> <kbd>right</kbd> <kbd>esc</kbd> &mdash; <kbd>f</kbd> for fullscreen. Also, try resizing your browser window.</p>
		</div>
		<h3>Default Options</h3>
		<Gallery images={imageMap(images.default)} />

		<h3>With Thumbnails</h3>
		<Gallery images={imageMap(images.thumbnail)} showThumbnails />

		<h3>Themed Lightbox</h3>
		<Gallery images={imageMap(images.themed)} theme={theme} showThumbnails />
	</div>,
	document.getElementById('example')
);
