import * as React				 	from 'react';
import { Link } 					from 'react-router-dom';

class Logo extends React.Component<any, any> {
	
	render () {
		return (
			<div className="sn_sidebar__logo">
				<Link to="/">
					<img src={require('../images/logo.png')} alt="site logo" />
				</Link>
				<div className="sn_menu" onClick={this.props.openMenu}>
					<span />
				</div>
			</div>
		);
	}
}

export default Logo;
