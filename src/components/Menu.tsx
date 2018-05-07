import * as React				from 'react';
import MenuItem 				from './MenuItem';
import { connect }                          from 'react-redux';
import { Actions
}                                           from '@sensenet/redux';
import { LoginState }                       from '@sensenet/client-core';

const DATA = require('../config.json');
const fontImportantClass = ' fi ';

class Menu extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			menuName : ['All users', 'Login'],
			menuIcon : ['fi flaticon-lightbulb-idea', 'fi flaticon-family-tree', 
						'fi flaticon-partners', 'fi flaticon-calendar', 'fi flaticon-discussion', 'fi flaticon-people', 
						'fi flaticon-folded-newspaper', 'fi flaticon-book'],
			menuItems: null,
			isDataFetched: false
		};
	}

	componentDidMount  () {
        let path = DATA.menu;
        const  options = {
            select : ['Name', 'IconName', 'Id', 'Path', 'DisplayName']
        };
        let users = this.props.getMenuItems(path, options);

        users.then( (result: any) => {
            console.log(result.value.entities.entities);
            this.setState({
                isDataFetched : true,
                menuItems: result.value.entities.entities
            });
        });

        users.catch((err: any) => {
            console.log(err);
        });
    }

	render () {
		if ( !this.state.isDataFetched ) {
            return null;
		}
		const status = this.props.userLoginState !== LoginState.Authenticated;
        let menuItems = this.state.menuItems;
        const menu = Object.keys(menuItems).map( (key: any) => 
            (
                <MenuItem key={key} name={menuItems[key].DisplayName} icon={fontImportantClass + this.state.menuItems[key].IconName} pathTo="/"/>
            )
        );
		return (
			<div className="sn_sidebar__menu">
				{status ? '' : 
					<MenuItem name={this.state.menuName[0]} icon={fontImportantClass + 'flaticon-group-of-businessmen'} pathTo="/otherUser"/>
				}
				{status ? '' : menu}
				<MenuItem name={this.state.menuName[1]} icon={this.state.menuIcon[1]} pathTo="/login"/>
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
        getMenuItems:    (path: string, options: any) => dispatch(Actions.requestContent( path, options )),
    })
)(Menu as any);