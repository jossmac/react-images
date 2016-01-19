import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';

class Gallery extends Component {
	constructor() {
		super();

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}
	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	renderGallery () {
		if (!this.props.images) return;
		const gallery = this.props.images.map((obj, i) => {
			return (
				<a key={i} href={obj.src} onClick={(event) => this.openLightbox(i, event)} style={styles.thumbnail}>
					<img src={obj.thumbnail} style={styles.thumbnailImage} width={styles.thumbnail.size} height={styles.thumbnail.size} />
				</a>
			);
		});

		return (
			<div style={styles.gallery}>
				{gallery}
			</div>
		);
	}
	render () {
		return (
			<div className="section">
				{this.props.heading && <h2>{this.props.heading}</h2>}
				{this.props.subheading && <p>{this.props.subheading}</p>}
				{this.renderGallery()}
				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickPrev={this.gotoPrevious}
					onClickNext={this.gotoNext}
					onClose={this.closeLightbox}
					theme={this.props.theme}
				/>
			</div>
		);
	}
};

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	images: PropTypes.array,
	heading: PropTypes.string,
	subheading: PropTypes.string,
	sepia: PropTypes.bool,
};

const THUMBNAIL_SIZE = 72;

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
		height: 'auto',
		maxWidth: '100%',
		// height: THUMBNAIL_SIZE,
		// left: '50%',
		// position: 'relative',
		//
		// WebkitTransform: 'translateX(-50%)',
		// MozTransform:    'translateX(-50%)',
		// msTransform:     'translateX(-50%)',
		// transform:       'translateX(-50%)',
	},
};

export default Gallery;
