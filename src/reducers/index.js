import { combineReducers } from 'redux';

import paintColor from './paint.color.reducer';
import paintTool from './paint.tool.reducer';
import clearCanvas from './clear.canvas.reducer';

export default combineReducers({
	isCanvasClear: clearCanvas,
	paintColor,
	paintToolKey: paintTool,
});