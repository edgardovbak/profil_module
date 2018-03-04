import React, { Component } from 'react';

class About extends Component {

	constructor(props) {
	    super(props);
	    this.state = {

		};
  	}

	render() {

		return (
			<div className="about">
				{this.props.about}
			</div>
		);
	}
};

export default About;
