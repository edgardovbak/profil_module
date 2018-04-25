import * as React				from 'react';
import MenuItem 				from './MenuItem';

class Menu extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			menuName : ['All users', 'Login', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
			menuIcon : ['fi flaticon-lightbulb-idea', 'fi flaticon-family-tree', 
						'fi flaticon-partners', 'fi flaticon-calendar', 'fi flaticon-discussion', 'fi flaticon-people', 
						'fi flaticon-folded-newspaper', 'fi flaticon-book'],
		};
	}

	render () {
		return (
			<div className="sn_sidebar__menu">
				<MenuItem name={this.state.menuName[0]} icon={this.state.menuIcon[0]} pathTo="/otherUser"/>
				<MenuItem name={this.state.menuName[1]} icon={this.state.menuIcon[1]} pathTo="/login"/>
				<MenuItem name={this.state.menuName[2]} icon={this.state.menuIcon[2]} pathTo="/"/>
				<MenuItem name={this.state.menuName[3]} icon={this.state.menuIcon[3]} pathTo="/"/>
				<MenuItem name={this.state.menuName[4]} icon={this.state.menuIcon[4]} pathTo="/"/>
				<MenuItem name={this.state.menuName[5]} icon={this.state.menuIcon[5]} pathTo="/"/>
				<MenuItem name={this.state.menuName[6]} icon={this.state.menuIcon[6]} pathTo="/"/>
				<MenuItem name={this.state.menuName[7]} icon={this.state.menuIcon[7]} pathTo="/"/>
			</div>
		);
	}
}

export default Menu;
