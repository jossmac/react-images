/* eslint react/prop-types: 0 */

import React from 'react/addons';
import Standard from './components/Standard';

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

React.render(
	<Standard images={IMAGES} />,
	document.getElementById('example')
);
