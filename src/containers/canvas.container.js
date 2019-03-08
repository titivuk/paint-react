import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FILL_CANVAS } from '../constants/actions';


class CanvasContainer extends React.PureComponent {


	painting = false;
	currentPosition = null;
	prevPosition = null;
	canvas = null;
	ctx = null;


	onMouseDownEvent = (e) => {
		const { isCanvasClear } = this.props;

		if (isCanvasClear) {
			this.props.dispatch({ type: FILL_CANVAS });
		}

		if (!this.painting) {
			const { offsetX, offsetY } = e.nativeEvent;

			this.painting = true;
			this.currentPosition = {
				x: offsetX, y: offsetY
			};

			this.paint();
		}
	};


	onMouseMoveEvent = (e) => {
		const { offsetX, offsetY } = e.nativeEvent;

		if (!this.painting) {
			return;
		}

		const { x: currX, y: currY, } = this.currentPosition;

		if (currX === offsetX && currY === offsetY) {
			return;
		}

		this.currentPosition = { x: offsetX, y: offsetY };
		this.prevPosition = { x: currX, y: currY };

		this.paint();
	};


	onMouseUpEvent = () => {
		this.stopPainting();
	};


	/**
	 * use mouseLeave event rather than mouseOut because it prevent event bubbling
	 */
	onMouseLeaveEvent = () => {
		this.stopPainting();
	};


	stopPainting() {
		this.currentPosition = null;
		this.prevPosition = null;
		this.painting = false;
	}


	paint() {
		if (this.currentPosition === null) {
			return;
		}

		const { x: currentX, y: currentY } = this.currentPosition;
		const { x: prevX, y: prevY } = this.prevPosition || {};

		/**
		 * if u just put the mark then draw point as rectangle
		 * else connect prev and current coordinates with line
		 */
		if (!Number.isInteger(prevX) || !Number.isInteger(prevY)) {
			this.ctx.fillRect(currentX, currentY, 5, 5);
		} else {
			this.ctx.beginPath();
			// Move the the prevPosition of the mouse
			this.ctx.moveTo(prevX, prevY);
			// Draw a line to the current position of the mouse
			this.ctx.lineTo(currentX, currentY);
			// Visualize the line using the strokeStyle
			this.ctx.stroke();
		}
	}


	updateCanvasColorBrush() {
		if (this.ctx) {
			const { paintColor } = this.props;

			this.ctx.strokeStyle = paintColor;

			/**
			 * update fillStyle to because we draw dot as a rectangle.
			 * TODO: fix it
			 */
			this.ctx.fillStyle = paintColor;
		}
	}


	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}


	componentDidUpdate(prevProps) {
		if (prevProps.paintColor !== this.props.paintColor) {
			this.updateCanvasColorBrush();
		}

		if (this.props.isCanvasClear) {
			this.clearCanvas();
		}
	}


	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		this.ctx.canvas.width = 1000;
		this.ctx.canvas.height = 600;
		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';
		this.ctx.lineWidth = 5;
	}


	render() {
		return (
			<canvas className='canvas'
				onMouseDown={this.onMouseDownEvent}
				onMouseLeave={this.onMouseLeaveEvent}
				onMouseMove={this.onMouseMoveEvent}
				onMouseUp={this.onMouseUpEvent}
				ref={(ref) => (this.canvas = ref)}
			/>
		);
	}


}


CanvasContainer.propTypes = {
	paintColor: PropTypes.string.isRequired,
	isCanvasClear: PropTypes.bool.isRequired,
};

CanvasContainer.defaultProps = {
	isCanvasClear: true,
};


export default connect(
	(state) => ({
		paintColor: state.paintColor,
		isCanvasClear: state.isCanvasClear,
	}),
)(CanvasContainer);


