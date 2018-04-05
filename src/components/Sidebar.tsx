import * as React			from 'react';
import Logo 				from './Logo';
import Menu 				from './Menu';
import User 				from './User';

class Sidebar extends React.Component<any, {}> {
	
	render () {
		
		return (
			<div className="sn_sidebar">
				<Logo openMenu={this.props.openMenu} />
				<User/>
				<Menu />
			</div>
		);
	}
}

export default Sidebar;
