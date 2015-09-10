/* eslint react/prop-types: 0 */

import React from 'react/addons';
import Lightbox from 'react-images';
import Button from './components/Button';
import Gallery from './components/Gallery';

const IMAGES = [
	'http://www.fillmurray.com/400/600',
	'http://www.fillmurray.com/600/900',
	'http://www.fillmurray.com/500/500',
	'http://www.fillmurray.com/700/700',
	'http://www.fillmurray.com/900/600',
	'http://www.fillmurray.com/600/400',

	'http://www.fillmurray.com/401/601',
	'http://www.fillmurray.com/601/901',
	'http://www.fillmurray.com/501/501',
	'http://www.fillmurray.com/701/701',
	'http://www.fillmurray.com/901/601',
	'http://www.fillmurray.com/601/401',

	'http://www.fillmurray.com/402/602',
	'http://www.fillmurray.com/602/902',
	'http://www.fillmurray.com/502/502',
	'http://www.fillmurray.com/702/702',
	'http://www.fillmurray.com/902/602',
	'http://www.fillmurray.com/602/402',
];

const styles = Lightbox.extendStyles({
	image: {
		border: '10px solid white',
		borderRadius: 10,
		WebkitFilter: 'sepia(100%)',
		filter: 'sepia(100%)',
	},
	arrow: {
		backgroundColor: 'rgba(0,0,0,0.1)',
		borderRadius: 10,
	},
});

React.render(
	<div>
		<Gallery heading="Gallery" images={IMAGES} />
		<Gallery heading="Custom Styles" images={IMAGES} styles={styles} />
		<Button heading="Launch with a button" images={IMAGES} />
		<hr />
		<p className="hint">
			Images courtesy of <a href="http://www.fillmurray.com" target="_blank">http://www.fillmurray.com</a>
		</p>
	</div>,
	document.getElementById('example')
);
