import * as React				 	from 'react';
import { Link } 					from 'react-router-dom';

interface Props {
	openMenu: Function;
}

class Logo extends React.Component<Props, any> {
	constructor(prop: Props) {
		super(prop);

		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler = () => {
		this.props.openMenu();
	}
	
	public render () {
		return (
			<div className="sn_sidebar__logo">
				<Link to="/">
					<img src={require('../images/logo.png')} alt="site logo" />
				</Link>
				<div className="sn_menu" onClick={this.clickHandler}>
					<span />
				</div>
			</div>
		);
	}
}

export default Logo;
