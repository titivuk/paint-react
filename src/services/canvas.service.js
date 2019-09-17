import { PAINT_TOOLS } from '../constants/constants';


export const setupCanvas = (ctx, properties = {}) => {
	const {
		lineCap = 'butt',
		lineJoin = 'round',
		lineWidth = 5,
		height = 600,
		width = 1000,
	} = properties;

	ctx.canvas.width = width;
	ctx.canvas.height = height;
	// https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/lineJoin
	ctx.lineJoin = lineJoin;
	// https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/lineCap
	ctx.lineCap = lineCap;
	ctx.lineWidth = lineWidth;
};


export const updateCanvasColorBrush = (ctx, color) => {
	if (ctx) {
		ctx.strokeStyle = color;

		/**
		 * update fillStyle to because we draw dot as a rectangle.
		 * TODO: fix it
		 */
		ctx.fillStyle = color;
	}
}


export const clearCanvas = (ctx) => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}


const paintCircle = (ctx, x, y, r) => {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.stroke();
};


export const paintPen = (ctx, startCoordinates, endCoordinates) => {
	const { x: startX, y: startY } = startCoordinates;
	const { x: endX, y: endY } = endCoordinates;

	if (Math.sign(endX) === -1 || Math.sign(endY) === -1) {
		return;
	}

	/**
	 * if u just put the mark then draw point as rectangle
	 * else connect prev and current coordinates with line
	 */
	if (Math.sign(startX) === -1 || Math.sign(startY) === -1) {
		ctx.fillRect(endX, endY, 5, 5);
	} else {
		ctx.beginPath();
		// Move the the prevPosition of the mouse
		ctx.moveTo(startX, startY);
		// Draw a line to the current position of the mouse
		ctx.lineTo(endX, endY);
		// Visualize the line using the strokeStyle
		ctx.stroke();
	}
};


export const paintCircleByTwoPoints = (ctx, initialCoordinates, currentCoordinates) => {
	const { x: initialX, y: initialY } = initialCoordinates;
	const { x: currX, y: currY } = currentCoordinates;

	const centerX = (currX + initialX) / 2;
	const centerY = (currY + initialY) / 2;
	const radius = Math.sqrt(Math.abs(initialX - centerX) ** 2 + Math.abs(initialY - centerY) ** 2);

	if (radius > 0) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		paintCircle(ctx, centerX, centerY, radius);

		return [centerX, centerY, radius];
	}

	return null;
};
