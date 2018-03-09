import React, { Component } 		from 'react';
import logo 						from '../images/logo.png';
import { Link } 					from 'react-router-dom'

class Logo extends Component {
	render () {
		return (
			<div className="sidebar__logo">
				<Link to="/">
					<img src={logo} alt="site logo" />
				</Link>
			</div>
		);
	}
};

export default Logo;
