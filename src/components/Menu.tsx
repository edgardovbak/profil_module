import * as React				            from 'react';
import MenuItem 				            from './MenuItem';
import { connect }                          from 'react-redux';
import { Actions
}                                           from '@sensenet/redux';
import { LoginState }                       from '@sensenet/client-core';
import { IODataParams }                     from '@sensenet/client-core/dist/Models/IODataParams';
import { MenuItemType }                     from '../type/MenuItemType';
const DATA = require('../config.json');
const fontImportantClass = ' fi ';

interface Props {
    userLoginState: string;
    logoutEvent: Function;
    getMenuItems: (path: string, options: IODataParams<MenuItemType>) => Promise<{
        value: {
            entities: any;
            result: any;
        }
    }>;
}

export class MenuComponent extends React.Component<Props, any> {
    unmount: boolean;
	constructor(props: any) {
		super(props);
		this.state = {
			menuItems: null,
            isDataFetched: false,
            status: this.props.userLoginState !== LoginState.Authenticated
        };
        
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    
    componentWillUnmount() {
        this.unmount = true;
    }

	public async componentDidMount  () {
        let path = DATA.menu;
        let menuItems = await this.props.getMenuItems(path, {
            select : ['Name', 'Id', 'Path', 'DisplayName', 'IconClassName']
        });
        if (!this.unmount) {
            this.setState({
                isDataFetched : true,
                menuItems: menuItems.value.entities.entities
            });  
        }
    }

    handleLogoutClick = (e: any) => {
        console.log(12);
    }

	public render () {
		if ( !this.state.isDataFetched ) {
            return null;
		}
        let menuItems = this.state.menuItems;
        const menu = Object.keys(menuItems).map( (key: any) => 
            (
                <MenuItem key={key} name={menuItems[key].DisplayName} icon={fontImportantClass + this.state.menuItems[key].IconClassName} pathTo="/"/>
            )
        );
		return (
			<div className="sn_sidebar__menu">
				{this.state.status ? '' : 
                    <MenuItem name={'All users'} icon={fontImportantClass + 'flaticon-group-of-businessmen'} pathTo="/otherUser"/>
                }
                {this.state.status ? '' : 
                    <MenuItem name={'Change Password'} icon={fontImportantClass + 'flaticon-group-of-businessmen'} pathTo="/changePass"/>
                }
                {this.state.status ? '' : menu}
                {this.state.status ? 
                    <MenuItem name={'Login'} icon={fontImportantClass + 'flaticon-folded-newspaper'} pathTo="/login"/>
                    : 
                    <MenuItem name={'Log Out'} logoutEvent={this.handleLogoutClick} icon={fontImportantClass + 'flaticon-group-of-businessmen'} pathTo="/"/>
                }
				
			</div>
		);
	}
}

// export default Menu;

const mapStateToProps = (state: any, match: any) => {
    return {
        userLoginState: 		state.sensenet.session.loginState, // state.user.user.FullName,
    };
};

export default connect(
    mapStateToProps,
    (dispatch) => ({
        getMenuItems:       (path: string, options: any) => dispatch(Actions.requestContent( path, options )),
        logout:             () => dispatch(Actions.userLogout()),
    })
)(MenuComponent as any);