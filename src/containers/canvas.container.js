import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FILL_CANVAS } from '../constants/actions';
import { PAINT_TOOLS } from '../constants/constants';

import * as CanvasService from '../services/canvas.service';
import canvasContainerRepositoryInstance from '../repositories/canvas.container.repository';


class CanvasContainer extends React.PureComponent {


	painting = false;
	canvas = null;
	canvasCatcher = null;
	ctx = null;
	ctxCatcher = null;


	componentDidUpdate(prevProps) {
		const { paintColor } = this.props;

		if (prevProps.paintColor !== paintColor) {
			CanvasService.updateCanvasColorBrush(this.ctx, paintColor);
			CanvasService.updateCanvasColorBrush(this.ctxCatcher, paintColor);
		}

		if (this.props.isCanvasClear) {
			CanvasService.clearCanvas(this.ctx);
		}
	}


	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		this.ctxCatcher = this.canvasCatcher.getContext('2d');

		CanvasService.setupCanvas(this.ctx);
		CanvasService.setupCanvas(this.ctxCatcher);
	}


	onMouseDownEvent = (e) => {
		const { isCanvasClear } = this.props;

		if (isCanvasClear) {
			this.props.dispatch({ type: FILL_CANVAS });
		}

		if (!this.painting) {
			const { offsetX, offsetY } = e.nativeEvent;

			this.painting = true;

			canvasContainerRepositoryInstance.setCurrentPosition(offsetX, offsetY);
			canvasContainerRepositoryInstance.setInitialPosition(offsetX, offsetY);

			this.paint();
		}
	};


	onMouseMoveEvent = (e) => {
		const { offsetX, offsetY } = e.nativeEvent;

		if (!this.painting) {
			return;
		}

		const { x: currX, y: currY, } = canvasContainerRepositoryInstance.getCurrentPosition();

		if (currX === offsetX && currY === offsetY) {
			return;
		}

		canvasContainerRepositoryInstance.setCurrentPosition(offsetX, offsetY);
		canvasContainerRepositoryInstance.setPreviousPosition(currX, currY);

		this.paint();
	};


	onMouseUpEvent = () => {
		this.moveFigureFromCatcherToCanvas();
		this.stopPainting();
	};


	/**
	 * use mouseLeave event rather than mouseOut because it prevent event bubbling
	 */
	onMouseLeaveEvent = () => {
		this.stopPainting();
	};


	stopPainting() {
		canvasContainerRepositoryInstance.resetCoordinates();
		this.painting = false;
	}


	moveFigureFromCatcherToCanvas() {
		const canvasCatcherFigure = canvasContainerRepositoryInstance.getCanvasCatcherFigure();

		if (!canvasCatcherFigure || !canvasCatcherFigure.properties) {
			return;
		}

		const { properties } = canvasCatcherFigure;
		const { paintToolKey } = this.props;
		const paintTool = PAINT_TOOLS[paintToolKey];

		switch (paintTool) {
			case PAINT_TOOLS.CIRCLE:
				this.moveCircleFromCatcherToCanvas(properties);
				break;
			default:
				break;
		}
	}


	moveCircleFromCatcherToCanvas({ centerX, centerY, r }) {
		this.ctx.beginPath();
		this.ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
		this.ctx.stroke();

		// clear catcher canvas
		this.ctxCatcher.clearRect(0, 0, this.canvasCatcher.width, this.canvasCatcher.height);
	}


	paint() {
		const { paintToolKey } = this.props;
		const paintTool = PAINT_TOOLS[paintToolKey];

		switch (paintTool) {
			case PAINT_TOOLS.CIRCLE:
				const initialCoordinates = canvasContainerRepositoryInstance.getInitialPosition();
				const currentCoordinates = canvasContainerRepositoryInstance.getCurrentPosition();
				const circleProperties = CanvasService.paintCircleByTwoPoints(this.ctxCatcher, initialCoordinates, currentCoordinates);

				if (circleProperties && circleProperties.length === 3) {
					const [x, y, r] = circleProperties;
					canvasContainerRepositoryInstance.setCanvasCatcherFigure({ x, y, r });
				}

				break;
			case PAINT_TOOLS.PEN: {
				const currentCoordinates = canvasContainerRepositoryInstance.getCurrentPosition();
				const previousCoordinates = canvasContainerRepositoryInstance.getPreviousPosition();
				CanvasService.paintPen(this.ctx, previousCoordinates, currentCoordinates);
				break;
			}
			default:
				break;
		}
	}


	render() {
		return (
			<>
				<canvas className='canvas'
					onMouseDown={this.onMouseDownEvent}
					onMouseLeave={this.onMouseLeaveEvent}
					onMouseMove={this.onMouseMoveEvent}
					onMouseUp={this.onMouseUpEvent}
					ref={(ref) => (this.canvas = ref)}
				/>
				<canvas className='canvas canvas-catcher'
					onMouseDown={this.onMouseDownEvent}
					onMouseLeave={this.onMouseLeaveEvent}
					onMouseMove={this.onMouseMoveEvent}
					onMouseUp={this.onMouseUpEvent}
					ref={(ref) => (this.canvasCatcher = ref)}
				/>
			</>
		);
	}


}


CanvasContainer.propTypes = {
	isCanvasClear: PropTypes.bool.isRequired,
	paintColor: PropTypes.string.isRequired,
	paintToolKey: PropTypes.string.isRequired,
};

CanvasContainer.defaultProps = {
	isCanvasClear: true,
};


export default connect(
	(state) => ({
		isCanvasClear: state.isCanvasClear,
		paintColor: state.paintColor,
		paintToolKey: state.paintToolKey,
	}),
)(CanvasContainer);


