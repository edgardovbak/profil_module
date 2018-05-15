import * as React				 			from 'react';
import { Link } 					        from 'react-router-dom';

interface Props {
	pathTo:  string;
	name: string;
	icon: string;
}

class MenuItem extends React.Component<Props, {}> {

	constructor(props: any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () { 
		console.log( this.props.name);
	}

	render() {
		let path = this.props.pathTo ? '/' : this.props.pathTo;
		return (
			<Link to={path} className="sn_sidebar__menu__item" onClick={this.handleClick}>
				<span className="sn_sidebar__menu__item__icon">
					<i className={this.props.icon} />
				</span>
				<span className="sn_sidebar__menu__item__name">
					{this.props.name}
				</span>
			</Link>
		);
	}
}

export default MenuItem;
