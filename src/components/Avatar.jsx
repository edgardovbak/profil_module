import React, { Component } from 'react';
import default_avater from '../images/default_avater.svg';

class Avatar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<div className="user__avatar">
				<img src={default_avater} alt="" />
			</div>
		)
	}
};

export default Avatar;
