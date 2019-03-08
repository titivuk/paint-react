import { combineReducers } from 'redux';

import paintColor from './paint.color.reducer';
import clearCanvas from './clear.canvas.reducer';

export default combineReducers({
	paintColor,
	isCanvasClear: clearCanvas,
});