import React from 'react';
import Lightbox from 'react-images';

var Button = React.createClass({
	displayName: 'Button',
	propTypes: {
		images: React.PropTypes.array,
	},
	getInitialState () {
		return {
			lightboxIsOpen: false,
		};
	},
	gotoPrevious (event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	},
	gotoNext (event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	},
	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	},
	closeLightbox () {
		this.setState({
			lightboxIsOpen: false,
		});
	},
	render () {
		return (
			<div className="section">
				<h2>{this.props.heading}</h2>
				<button onClick={(event) => this.openLightbox(0, event)}>Sure, why not?</button>
				<Lightbox
					images={this.props.images}
					currentImage={this.state.currentImage}
					isOpen={this.state.lightboxIsOpen}
					onClickPrev={this.gotoPrevious}
					onClickNext={this.gotoNext}
					onClose={this.closeLightbox}
					styles={this.props.styles}
				/>
			</div>
		);
	}
});

const THUMBNAIL_SIZE = 58;

const styles = {
	gallery: {
		marginLeft: -5,
		marginRight: -5,
		overflow: 'hidden',
	},
	thumbnail: {
		backgroundSize: 'cover',
		borderRadius: 3,
		float: 'left',
		height: THUMBNAIL_SIZE,
		margin: 5,
		overflow: 'hidden',
		width: THUMBNAIL_SIZE,
	},
	thumbnailImage: {
		display: 'block',
		height: THUMBNAIL_SIZE,
		left: '50%',
		position: 'relative',

		WebkitTransform: 'translateX(-50%)',
		MozTransform:    'translateX(-50%)',
		msTransform:     'translateX(-50%)',
		transform:       'translateX(-50%)',
	},
};

module.exports = Button;
