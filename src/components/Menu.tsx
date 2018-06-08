import * as React				            from 'react';
import MenuItem 				            from './MenuItem';
import { connect }                          from 'react-redux';
import { Actions
}                                           from '@sensenet/redux';
import { LoginState }                       from '@sensenet/client-core';
import { IODataParams }                     from '@sensenet/client-core/dist/Models/IODataParams';
import { Folder }                           from '@sensenet/default-content-types';
const DATA = require('../config.json');
const fontImportantClass = ' fi ';

interface Props {
    userLoginState: string;
    getMenuItems: (path: string, options: IODataParams<Folder>) => Promise<{
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
    }
    
    componentWillUnmount() {
        this.unmount = true;
    }

	public async componentDidMount  () {
        let path = DATA.menu;
        let menuItems = await this.props.getMenuItems(path, {
            select : ['Name', 'Id', 'Path', 'DisplayName']
        });
        if (!this.unmount) {
            this.setState({
                isDataFetched : true,
                menuItems: menuItems.value.entities.entities
            });  
        }
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
)(MenuComponent as any);