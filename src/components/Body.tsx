import * as React				            from 'react';
import { connect }                          from 'react-redux';
import Sidebar                              from './Sidebar';
import Header                               from './Header';
import {
    Route,
    Redirect,
    Switch,
    withRouter,
}                                           from 'react-router-dom';
import { LoginState }                       from '@sensenet/client-core';
import OtherUser                            from './OtherUser';
import Profil                               from './Profil';
import EditProfil                           from './EditProfil';

class Body extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            open : false,
        },

        this.openMenu = this.openMenu.bind(this);
    }

    openMenu() {
        let menuState = !this.state.open;
        this.setState({         
            open: menuState
          }); 
    } 

    render() {
        const status = this.props.userLoginState !== LoginState.Authenticated;

		return (
			<div className={this.state.open ? 'content_to_right open' : 'content_to_right'}>
                <Header />
                <Sidebar openMenu={this.props.openMenu}/>
                <div className="sn_overflow" onClick={this.props.openMenu} />
                <main className="sn_main">
                    <div className="sn_wrapp">
                        <Switch>
                            <Route 
                                exact={true}
                                path="/otherUser"  
                                render={(routerProps) => {
                                    return status ?
                                    <Redirect key="login" to="/login" />
                                    : <OtherUser {...routerProps} />;
                                }} 
                            />
                            <Route 
                                exact={true}
                                path="/user/:user"
                                render={(routerProps) => {
                                    return status ?
                                    <Redirect key="login" to="/login" />
                                    : <Profil {...routerProps} />;
                                }} 
                                userName={this.props.userName}
                            />
                            <Route 
                                exact={true}
                                path="/editUser"  
                                render={(routerProps) => {
                                    return status ?
                                    <Redirect key="login" to="/login" />
                                    : <EditProfil {...routerProps} />;
                                }} 
                            />
                        </Switch> 
                    </div>
                </main>
            </div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
    return {
        userName :              state.sensenet.session.user.userName,
        userLoginState: 		state.sensenet.session.loginState, // state.user.user.FullName,
    };
};

export default withRouter(connect(
    mapStateToProps,
)(Body as any));
 