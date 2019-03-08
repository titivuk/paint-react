import React from 'react';


class HeaderComponent extends React.Component {


	// constructor(props) {
	// 	super(props);
	// 	// this.state = {};
	// }


	clearCanvas(e) {
		console.log('clear canvas');
	}


	render() {
		return (
			<div>
				<button onClick={(e) => { this.clearCanvas(e) }}>Clear</button>
			</div>
		);
	}


}


export default HeaderComponent;


