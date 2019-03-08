import React from 'react';
import { connect } from 'react-redux';

import { DEFAULT_PAINT_COLOR } from '../constants/constants';
import { SWITCH_PAINTING_COLOR } from '../constants/actions';
import ColorPickerComponent from '../components/color.picker.component';


class ColorPickerContainer extends React.Component {


	state = {
		paintColor: DEFAULT_PAINT_COLOR,
		showColorPicker: false,
	};


	/**
	 * @param {Object} color
	 * @param {String} color.hex
	 */
	handleChangeComplete = ({ hex }) => {
		this.setState({ paintColor: hex });
		this.props.dispatch({ type: SWITCH_PAINTING_COLOR, payload: hex })
	};


	onColorBoxClick = (e) => {
		const { showColorPicker } = this.state;
		this.setState({ showColorPicker: !showColorPicker });
	}


	render() {
		const { paintColor, showColorPicker } = this.state;

		return (
			<ColorPickerComponent
				color={paintColor}
				onChangeComplete={this.handleChangeComplete}
				onColorBoxClick={this.onColorBoxClick}
				showColorPicker={showColorPicker}
			/>
		);
	}


}


export default connect()(ColorPickerContainer);