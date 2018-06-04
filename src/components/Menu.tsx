import * as React				            from 'react';
import MenuItem 				            from './MenuItem';
import { connect }                          from 'react-redux';
import { Actions
}                                           from '@sensenet/redux';
import { LoginState }                       from '@sensenet/client-core';
import { IODataParams }                     from '@sensenet/client-core/dist/Models/IODataParams';
const DATA = require('../config.json');
const fontImportantClass = ' fi ';

interface Props {
    userLoginState: string;
    getMenuItems: Function;
}

class Menu extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			menuItems: null,
            isDataFetched: false,
            status: this.props.userLoginState !== LoginState.Authenticated
		};
	}

	public componentDidMount  () {
        let path = DATA.menu;
        const  options = {
            select : ['Name', 'IconName', 'Id', 'Path', 'DisplayName']
        } as IODataParams<any>;
        let menuItems = this.props.getMenuItems(path, options);

        menuItems.then( (result: any) => {
            this.setState({
                isDataFetched : true,
                menuItems: result.value.entities.entities
            });
        });

        menuItems.catch((err: any) => {
            console.log(err);
        });
    }

	public render () {
		if ( !this.state.isDataFetched ) {
            return null;
		}
        let menuItems = this.state.menuItems;
        const menu = Object.keys(menuItems).map( (key: any) => 
            (
                <MenuItem key={key} name={menuItems[key].DisplayName} icon={fontImportantClass + this.state.menuItems[key].IconName} pathTo="/"/>
            )
        );
		return (
			<div className="sn_sidebar__menu">
				{this.state.status ? '' : 
					<MenuItem name={'All users'} icon={fontImportantClass + 'flaticon-group-of-businessmen'} pathTo="/otherUser"/>
				}
				{this.state.status ? '' : menu}
				<MenuItem name={'Login'} icon={fontImportantClass + 'flaticon-folded-newspaper'} pathTo="/login"/>
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