import React, { Component } 		from 'react';
import logo 						from '../images/logo.png';
import { Link } 					from 'react-router-dom'

class Logo extends Component {
	constructor(props) {
        super(props);
	}
	
	render () {
		return (
			<div className="sn_sidebar__logo">
				<Link to="/">
					<img src={logo} alt="site logo" />
				</Link>
				<div className="sn_menu" onClick={this.props.openMenu}>
					<span></span>
				</div>
			</div>
		);
	}
};

export default Logo;
