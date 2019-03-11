import React from 'react';
import PropTypes from 'prop-types';


class PaintToolsComponent extends React.PureComponent {


	render() {
		const { onPaintToolSelect, paintTools, selectedPaintToolKey, } = this.props;

		return (
			<ul className="paint-tools-list">
				{paintTools.map(({ paintToolKey, paintToolValue }) => {
					return <li
						onClick={onPaintToolSelect}
						key={paintToolKey}
						id={paintToolKey}
						className={`paint-tool-item ${paintToolKey === selectedPaintToolKey ? 'selected-paint-tool' : ''}`}>
						{paintToolValue}
					</li>;
				})}
			</ul>
		);
	}


}


PaintToolsComponent.propTypes = {
	onPaintToolSelect: PropTypes.func.isRequired,
	paintTools: PropTypes.array.isRequired,
	selectedPaintToolKey: PropTypes.string.isRequired,
};


export default PaintToolsComponent;


