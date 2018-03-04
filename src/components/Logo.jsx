import React, { Component } from 'react';
import logo from '../images/logo.png';

class Logo extends Component {
	render () {
		return (
			<div className="sidebar__logo">
				<a href="/">
					<img src={logo} alt="site logo" />
				</a>
			</div>
		);
	}
};

export default Logo;
