import React, { Component } from 'react';

class MenuItem extends Component {

	constructor(props) {
	    super(props);
	    this.state = {};
  	}

	handleClick() {
		console.log(this.props.name + " is not active now!!!");
	}

	render() {

		return (
			<div className="sn_sidebar__menu__item" onClick={this.handleClick.bind(this)}>
				<span className="sn_sidebar__menu__item__icon">
					<i className={this.props.icon}></i>
				</span>
				<span className="sn_sidebar__menu__item__name">
					{this.props.name}
				</span>
			</div>
		);
	}
};

export default MenuItem;
