import * as React				 			from 'react';
import { Link } 					        from 'react-router-dom';

interface Props {
	pathTo:  string;
	name: string;
	icon: string;
	onClick?: Function;
}

interface State {
	isClicked:  boolean;
	path: string;
}

class MenuItem extends React.Component<Props, State> {

	constructor(props: any) {
		super(props);
		this.state = {
			isClicked: false,
			path: !this.props.pathTo ? '/' : this.props.pathTo
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = () => { 
		this.setState({
			isClicked: true
		});
	}

	render() {
		return (
			<Link to={this.state.path} className="sn_sidebar__menu__item" onClick={this.handleClick}>
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
