class CanvasContainerRepository {


	constructor() {
		this.currentPosition = { x: -1, y: -1, };
		this.previousPosition = { x: -1, y: -1, };
		this.initialPosition = { x: -1, y: -1, };

		this.canvas = null;
		this.canvasCatcher = null;

		this.canvasCatcherFigure = {
			properties: null,
		};
	}


	setCurrentPosition(x, y) {
		if (Math.sign(x) === -1 || Math.sign(y) === -1) {
			console.error('Invalid coordinates');
			return;
		}

		this.currentPosition.x = x;
		this.currentPosition.y = y;
	}


	getCurrentPosition() {
		return this.currentPosition;
	}


	setPreviousPosition(x, y) {
		if (Math.sign(x) === -1 || Math.sign(y) === -1) {
			console.error('Invalid coordinates');
			return;
		}

		this.previousPosition.x = x;
		this.previousPosition.y = y;
	}


	getPreviousPosition() {
		return this.previousPosition;
	}


	setInitialPosition(x, y) {
		if (Math.sign(x) === -1 || Math.sign(y) === -1) {
			console.error('Invalid coordinates');
			return;
		}

		this.initialPosition.x = x;
		this.initialPosition.y = y;
	}


	getInitialPosition() {
		return this.initialPosition;
	}


	setCanvasCatcherFigure(properties) {
		this.canvasCatcherFigure = { properties };
	}


	getCanvasCatcherFigure() {
		return this.canvasCatcherFigure;
	}


	resetCoordinates() {
		this.currentPosition = { x: -1, y: -1, };
		this.previousPosition = { x: -1, y: -1, };
		this.initialPosition = { x: -1, y: -1, };
	}


}


export default new CanvasContainerRepository();