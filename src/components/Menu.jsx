import React, { Component } from 'react';
import MenuItem from './MenuItem';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuName : ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8"],
			menuIcon : ["fi flaticon-lightbulb-idea", "fi flaticon-family-tree", "fi flaticon-partners", "fi flaticon-calendar", "fi flaticon-discussion", "fi flaticon-people", "fi flaticon-folded-newspaper", "fi flaticon-book"],
		};
	}

	render () {
		return (
			<div className="sidebar__menu">
				<MenuItem name={this.state.menuName[0]} icon={this.state.menuIcon[0]} />
				<MenuItem name={this.state.menuName[1]} icon={this.state.menuIcon[1]} />
				<MenuItem name={this.state.menuName[2]} icon={this.state.menuIcon[2]} />
				<MenuItem name={this.state.menuName[3]} icon={this.state.menuIcon[3]} />
				<MenuItem name={this.state.menuName[4]} icon={this.state.menuIcon[4]} />
				<MenuItem name={this.state.menuName[5]} icon={this.state.menuIcon[5]} />
				<MenuItem name={this.state.menuName[6]} icon={this.state.menuIcon[6]} />
				<MenuItem name={this.state.menuName[7]} icon={this.state.menuIcon[7]} />
			</div>
		)
	}
};

export default Menu;
