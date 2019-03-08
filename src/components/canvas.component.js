import React from 'react';


class CanvasComponent extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			painting: false,
			currentPosition: null,
			prevPosition: null,
		};
	}


	onMouseDownEvent(e) {
		console.log(e.nativeEvent);
		const { painting } = this.state;

		if (!painting) {
			const { offsetX, offsetY } = e.nativeEvent;

			this.setState({
				currentPosition: {
					x: offsetX, y: offsetY
				}
			});
			this.setState({ painting: true });
		}
	}


	onMouseMoveEvent(e) {
		const { offsetX, offsetY } = e.nativeEvent;
		const { painting } = this.state;

		if (!painting) {
			return;
		}

		const {
			currentPosition: {
				x: currX, y: currY,
			}
		} = this.state;

		if (currX === offsetX && currY === offsetY) {
			return;
		}

		this.setState({
			prevPosition: { x: currX, y: currY },
			currentPosition: { x: offsetX, y: offsetY }
		});

		console.log(this.state);
	}


	onMouseUpEvent() {
		const { painting } = this.state;

		if (painting) {
			this.setState({ painting: false, currentPosition: null, prevPosition: null });
		}
	}


	paint() {
		const {
			currentPosition,
			prevPosition,
		} = this.state;

		if (currentPosition === null) {
			return;
		}

		const { x: currentX, y: currentY } = currentPosition;
		const { x: prevX, y: prevY } = prevPosition || {};

		console.log(currentX, currentY);
		console.log(prevX, prevY);

		/**
		 * if u just put the mark then draw point as rectangle
		 * else connect prev and current coordinates with line
		 */
		if (!Number.isInteger(prevX) || !Number.isInteger(prevY)) {
			this.ctx.fillRect(currentX, currentY, 1, 1);
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


	componentDidMount() {
		const { canvasSize } = this.props;
		console.log(this.canvas.height);
		console.log(this.canvas.width);

		this.ctx = this.canvas.getContext('2d');
		this.ctx.canvas.width = canvasSize;
		this.ctx.canvas.height = canvasSize;
		this.ctx.fillStyle = '#FF0000';
		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';
		this.ctx.lineWidth = 5;
	}


	render() {
		this.paint();

		return (
			<canvas className='canvas'
				ref={(ref) => (this.canvas = ref)}
				onMouseDown={(e) => this.onMouseDownEvent(e)}
				onMouseMove={(e) => this.onMouseMoveEvent(e)}
				onMouseUp={() => this.onMouseUpEvent()}>
			</canvas>
		);
	}


}


export default CanvasComponent;


