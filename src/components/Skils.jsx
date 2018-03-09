import React, { Component } from 'react';

class Skils extends Component {

	constructor(props) {
	    super(props);
	    this.state = {};
  	}

	render() {
		let slills_list = this.props.skills.split(";").map((skill) =>
			<li className="skils__item" key={skill.toString()}>
				<a href="/">{skill.toString()}</a>
			</li>
		);

		return (
			<ul className="skils">
				{slills_list}
			</ul>
		);
	}
};

export default Skils;
