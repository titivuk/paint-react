import React from 'react';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';


const ColorPickerComponent = (props) => {
	return (
		<div className='color-picker-wrapper' >
			<button className="color-box-button" onClick={props.onColorBoxClick} style={{ backgroundColor: props.color }} />
			{props.showColorPicker ?
				<SketchPicker class='color-picker'
					color={props.color}
					onChangeComplete={props.onChangeComplete}
				/> : null
			}
		</div>
	);
};


ColorPickerComponent.propTypes = {
	color: PropTypes.string.isRequired,
	onChangeComplete: PropTypes.func.isRequired,
	onColorBoxClick: PropTypes.func.isRequired,
};


export default ColorPickerComponent;
