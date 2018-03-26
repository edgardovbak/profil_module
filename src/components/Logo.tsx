import React				 		from 'react';
import logo 						from '../images/logo.png';
import { Link } 					from 'react-router-dom';

export interface MenuTrigger { 
	openMenu: boolean;
}

class Logo extends React.Component<MenuTrigger, {}> {
	constructor(props: MenuTrigger) {
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
