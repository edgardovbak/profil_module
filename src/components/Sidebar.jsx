import React, { Component } from 'react';
import Logo from'./Logo';
import Menu from'./Menu';
import User from'./User';

class Sidebar extends Component {
	render () {
		return (
			<div className="sn_sidebar">
				<Logo openMenu={this.props.openMenu}/>
				<User/>
				<Menu />
			</div>
		)
	}
};

export default Sidebar;
