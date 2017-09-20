import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import Thumbnail from './Thumbnail';
import Arrow from './Arrow';
import theme from '../theme';

const classes = StyleSheet.create({
	paginatedThumbnails: {
		bottom: theme.container.gutter.vertical,
		height: theme.thumbnail.size,
		padding: '0 50px',
		position: 'absolute',
		textAlign: 'center',
		whiteSpace: 'nowrap',
		left: '50%',
		transform: 'translateX(-50%)',
	},
});

const arrowStyles = {
	height: theme.thumbnail.size + (theme.thumbnail.gutter * 2),
	width: 40,
};

export default class PaginatedThumbnails extends Component {
	constructor (props) {
		super(props);

		this.state = {
			hasCustomPage: false,
		};

		this.gotoPrev = this.gotoPrev.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
	}
	componentWillReceiveProps (nextProps) {
		// Component should be controlled, flush state when currentImage changes
		if (nextProps.currentImage !== this.props.currentImage) {
			this.setState({
				hasCustomPage: false,
			});
		}
	}

	// ==============================
	// METHODS
	// ==============================

	getFirst () {
		const { currentImage, offset } = this.props;
		if (this.state.hasCustomPage) {
			return this.clampFirst(this.state.first);
		}
		return this.clampFirst(currentImage - offset);
	}
	setFirst (event, newFirst) {
		const { first } = this.state;

		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (first === newFirst) return;

		this.setState({
			hasCustomPage: true,
			first: newFirst,
		});
	}
	gotoPrev (event) {
		this.setFirst(event, this.getFirst() - this.props.offset);
	}
	gotoNext (event) {
		this.setFirst(event, this.getFirst() + this.props.offset);
	}
	clampFirst (value) {
		const { images, offset } = this.props;

		const totalCount = 2 * offset + 1; // show $offset extra thumbnails on each side

		if (value < 0) {
			return 0;
		} else if (value + totalCount > images.length) { // Too far
			return images.length - totalCount;
		} else {
			return value;
		}
	}

	// ==============================
	// RENDERERS
	// ==============================

	renderArrowPrev () {
		if (this.getFirst() <= 0) return null;

		return (
			<Arrow
				direction="left"
				size="small"
				icon="arrowLeft"
				onClick={this.gotoPrev}
				style={arrowStyles}
				title="Previous (Left arrow key)"
				type="button"
			/>
		);
	}
	renderArrowNext () {
		const { offset, images } = this.props;
		const totalCount = 2 * offset + 1;
		if (this.getFirst() + totalCount >= images.length) return null;

		return (
			<Arrow
				direction="right"
				size="small"
				icon="arrowRight"
				onClick={this.gotoNext}
				style={arrowStyles}
				title="Next (Right arrow key)"
				type="button"
			/>
		);
	}
	render () {
		const { images, currentImage, onClickThumbnail, offset } = this.props;

		const totalCount = 2 * offset + 1; // show $offset extra thumbnails on each side
		let thumbnails = [];
		let baseOffset = 0;
		if (images.length <= totalCount) {
			thumbnails = images;
		} else { // Try to center current image in list
			baseOffset = this.getFirst();
			thumbnails = images.slice(baseOffset, baseOffset + totalCount);
		}

		return (
			<div className={css(classes.paginatedThumbnails)}>
				{this.renderArrowPrev()}
				{thumbnails.map((img, idx) => (
					<Thumbnail key={baseOffset + idx}
						{...img}
						index={baseOffset + idx}
						onClick={onClickThumbnail}
						active={baseOffset + idx === currentImage} />
				))}
				{this.renderArrowNext()}
			</div>
		);
	}
}

PaginatedThumbnails.propTypes = {
	currentImage: PropTypes.number,
	images: PropTypes.array,
	offset: PropTypes.number,
	onClickThumbnail: PropTypes.func.isRequired,
};
