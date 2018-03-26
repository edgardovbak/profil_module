import * as React			from 'react';
import Logo 				from'./Logo';
import Menu 				from'./Menu';
import User 				from'./User';

export interface MenuTrigger {
	 openMenu
}

class Sidebar extends React.Component<MenuTrigger, {}> {
	
	render () {
		
		return (
			<div className="sn_sidebar">
				<Logo openMenu={ this.props.openMenu } />
				<User/>
				<Menu />
			</div>
		);
	}
};

export default Sidebar;
