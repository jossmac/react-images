/* eslint react/prop-types: 0 */

import React from 'react';
import {render} from 'react-dom';
import Lightbox from 'react-images';
import Button from './components/Button';
import Gallery from './components/Gallery';

const IMAGES = [
	{
	src: 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_c.jpg 800w',
			'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc.jpg 500w',
			'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_n.jpg 320w'
		],
	caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
	src: 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_c.jpg 800w',
			'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317.jpg 500w',
			'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_n.jpg 320w'
		],
	caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
	{
	src: 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_c.jpg 800w',
			'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f.jpg 500w',
			'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_n.jpg 320w'
		]
	},
	{
	src: 'https://c1.staticflickr.com/9/8109/8526026980_a152c5f11d_z.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8109/8526026980_a152c5f11d_s.jpg',
	},
	{
	src: 'https://c1.staticflickr.com/9/8243/8524916085_ed79b45249_z.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8243/8524916085_ed79b45249_s.jpg',
	},
	{
	src: 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_c.jpg',
	thumbnail: 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_s.jpg',
	srcset: [
			'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_b.jpg 1024w',
			'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_c.jpg 800w',
			'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f.jpg 500w',
			'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_n.jpg 320w'
		]
	},


	{
	src: 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_c.jpg 800w',
			'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58.jpg 500w',
			'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_n.jpg 320w'
		]
	},
	{
	src: 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_c.jpg 800w',
			'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e.jpg 500w',
			'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_n.jpg 320w'
		]
	},
	{
	src: 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_c.jpg 800w',
			'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434.jpg 500w',
			'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_n.jpg 320w'
		]
	},
	{
	src: 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_c.jpg 800w',
			'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8.jpg 500w',
			'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_n.jpg 320w'
		]
	},
	{
	src: 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_c.jpg 800w',
			'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6.jpg 500w',
			'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_n.jpg 320w'
		]
	},
	{
	src: 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_c.jpg 800w',
			'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af.jpg 500w',
			'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_n.jpg 320w'
		]
	},


	{
	src: 'https://c1.staticflickr.com/9/8391/8532223463_abe07ac0a6_z.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8391/8532223463_abe07ac0a6_s.jpg',
	},
	{
	src: 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_c.jpg 800w',
			'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1.jpg 500w',
			'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_n.jpg 320w'
		]
	},
	{
	src: 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_s.jpg',
	srcset: [
			'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_b.jpg 1024w',
			'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_c.jpg 800w',
			'https://c1.staticflickr.com/9/8381/8527501230_61882a7918.jpg 500w',
			'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_n.jpg 320w'
		]
	},
	{
	src: 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_c.jpg',
	thumbnail: 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_s.jpg',
	srcset: [
			'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_b.jpg 1024w',
			'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_c.jpg 800w',
			'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f.jpg 500w',
			'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_n.jpg 320w'
		]
	},
	{
	src: 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_c.jpg',
	thumbnail: 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_s.jpg',
	srcset: [
			'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_b.jpg 1024w',
			'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_c.jpg 800w',
			'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8.jpg 500w',
			'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_n.jpg 320w'
		]
	},
	{
	src: 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_c.jpg',
	thumbnail: 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_s.jpg',
	srcset: [
			'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_b.jpg 1024w',
			'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_c.jpg 800w',
			'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd.jpg 500w',
			'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_n.jpg 320w'
		]
	},
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
		<Gallery heading="Gallery" images={IMAGES} />
		<Gallery heading="Custom Styles" images={IMAGES} styles={styles} />
		<Button heading="Launch with a button" images={IMAGES} />
		<hr />
		<p className="hint">
			Images courtesy of <a href="http://www.sandygonzales.com" target="_blank">Sandy Gonzales</a>
		</p>
	</div>,
	document.getElementById('example')
);
