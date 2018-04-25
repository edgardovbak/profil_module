import * as React				 			from 'react';
import { Link } 					        from 'react-router-dom';

class MenuItem extends React.Component<any, {}> {

	constructor(props: any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () { 
		console.log( this.props.name + ' is not active now!!!' );
	}

	render() {

		return (
			<Link to={this.props.pathTo} className="sn_sidebar__menu__item" onClick={this.handleClick}>
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
