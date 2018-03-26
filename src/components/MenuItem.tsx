import React, { Component } from 'react';

export interface props { 
	name: string,
	icon: string,
	handleClick : Function
}

class MenuItem extends React.Component<props, {}> {

	constructor(props : props) {
	    super(props);
  	}

	handleClick() {
		console.log( this.props.name + " is not active now!!!" );
	}

	render() {

		return (
			<div className="sn_sidebar__menu__item" onClick={this.handleClick.bind(this)}>
				<span className="sn_sidebar__menu__item__icon">
					<i className={ this.props.icon }></i>
				</span>
				<span className="sn_sidebar__menu__item__name">
					{ this.props.name }
				</span>
			</div>
		);
	}
};

export default MenuItem;
