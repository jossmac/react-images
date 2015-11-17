/* eslint react/prop-types: 0 */

import React from 'react';
import {render} from 'react-dom';
import Lightbox from 'react-images';
import Button from './components/Button';
import Gallery from './components/Gallery';

const IMAGES = [
	'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_c.jpg',
	'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_c.jpg',
	'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_c.jpg',
	'https://c1.staticflickr.com/9/8109/8526026980_a152c5f11d_c.jpg',
	'https://c1.staticflickr.com/9/8243/8524916085_ed79b45249_c.jpg',
	'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_c.jpg',

	'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_c.jpg',
	'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_c.jpg',
	'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_c.jpg',
	'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_c.jpg',
	'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_c.jpg',
	'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_c.jpg',

	'https://c1.staticflickr.com/9/8391/8532223463_abe07ac0a6_c.jpg',
	'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_c.jpg',
	'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_c.jpg',
	'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_c.jpg',
	'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_c.jpg',
	'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_c.jpg',
];

const THUMBNAILS = [
	'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_s.jpg',
        'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_s.jpg',
        'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_s.jpg',
        'https://c1.staticflickr.com/9/8109/8526026980_a152c5f11d_s.jpg',
        'https://c1.staticflickr.com/9/8243/8524916085_ed79b45249_s.jpg',
        'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_s.jpg',
        
        'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_s.jpg',
        'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_s.jpg',
        'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_s.jpg',
        'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_s.jpg',
        'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_s.jpg',
        'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_s.jpg',
        
        'https://c1.staticflickr.com/9/8391/8532223463_abe07ac0a6_s.jpg',
        'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_s.jpg',
        'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_s.jpg',
        'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_s.jpg',
        'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_s.jpg',
        'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_s.jpg',
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

render(
	<div>
		<p style={{ marginBottom: 40 }}>Use your keyboard to navigate <kbd>left</kbd> <kbd>right</kbd> <kbd>esc</kbd> &mdash; Also, try resizing your browser window.</p>
		<Gallery heading="Gallery" images={IMAGES} thumbnails={THUMBNAILS} />
		<Gallery heading="Custom Styles" images={IMAGES} thumbnails={THUMBNAILS} styles={styles} />
		<Button heading="Launch with a button" images={IMAGES} />
		<hr />
		<p className="hint">
			Images courtesy of <a href="http://www.sandygonzales.com" target="_blank">Sandy Gonzales</a>
		</p>
	</div>,
	document.getElementById('example')
);
