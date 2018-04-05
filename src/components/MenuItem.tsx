import * as React				 from 'react';

class MenuItem extends React.Component<any, {}> {

	constructor(props: any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () { 
		alert( this.props.name + ' is not active now!!!' );
	}

	render() {

		return (
			<div className="sn_sidebar__menu__item" onClick={this.handleClick}>
				<span className="sn_sidebar__menu__item__icon">
					<i className={this.props.icon} />
				</span>
				<span className="sn_sidebar__menu__item__name">
					{this.props.name}
				</span>
			</div>
		);
	}
}

export default MenuItem;
