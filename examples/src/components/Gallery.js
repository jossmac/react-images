import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';

class Gallery extends Component {
	constructor () {
		super();

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
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
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}
	renderGallery () {
		if (!this.props.images) return;
		const gallery = this.props.images.map((obj, i) => {
			return (
				<a
					href={obj.src}
					key={i}
					onClick={(e) => this.openLightbox(i, e)}
					style={styles.thumbnail}
					>
					<img
						height={styles.thumbnail.size}
						src={obj.thumbnail}
						style={styles.thumbnailImage}
						width={styles.thumbnail.size}
					/>
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
		const { thumbnails } = this.props;

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
					onClickThumbnail={this.gotoImage}
					onClickImage={this.handleClickImage}
					onClose={this.closeLightbox}
					theme={this.props.theme}
					thumbnails={thumbnails}
				/>
			</div>
		);
	}
};

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	heading: PropTypes.string,
	images: PropTypes.array,
	sepia: PropTypes.bool,
	subheading: PropTypes.string,
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
