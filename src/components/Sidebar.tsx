import * as React			from 'react';
import Logo 				from './Logo';
import Menu 				from './Menu';
import SidebarUser 				from './SidebarUser';

interface Props {
	openMenu: Function;
}

class Sidebar extends React.Component<Props, {}> {
	
	public render () {
		
		return (
			<div className="sn_sidebar">
				<Logo openMenu={this.props.openMenu} />
				<SidebarUser/>
				<Menu />
			</div>
		);
	}
}

export default Sidebar;
