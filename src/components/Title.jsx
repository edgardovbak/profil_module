import React, { Component } from 'react';

class Title extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<h2 className="sn_title">
				{this.props.name}
			</h2>
		)
	}
};

export default Title;
