import * as React				            from 'react';
import { connect }                          from 'react-redux';
import Sidebar                              from './Sidebar';
import Header                               from './Header';
import {
    Route,
    Redirect,
    Switch,
    withRouter
}                                           from 'react-router-dom';
import { LoginState }                       from '@sensenet/client-core';
import OtherUser                            from './OtherUser';
import Profil                               from './Profil';
import EditProfil                           from './EditProfil';
import Usermanagement                       from './Usermanagement';
import ForgottenPass                        from './ForgottenPass';
import Home                                 from './Home';
import AchievementPage                      from './AchievementPage';

export class BodyComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            open : false,
            isDataFetched: true,
            articles: {},
            status: this.props.userLoginState !== LoginState.Authenticated
        },

        this.openMenu = this.openMenu.bind(this);
    }

    public openMenu = () => {
        let menuState = !this.state.open;
        
        this.setState({         
            open: menuState
        }); 
    }

    public render() {
		return (
                <div className={this.state.open ? 'content_to_right open' : 'content_to_right'}>
                    <Header />
                    <Sidebar openMenu={this.openMenu}/>
                    <div className="sn_overflow" onClick={this.props.openMenu} />
                    <main className="sn_main">
                        <div className="sn_wrapp">
                            <Switch>
                                <Route 
                                    exact={true}
                                    path="/"  
                                    render={(routerProps) => {
                                        return this.state.status ?
                                        <Redirect key="login" to="/login" />
                                        : <Home {...routerProps} />;
                                    }} 
                                />
                                <Route 
                                    exact={true}
                                    path="/otherUser"  
                                    render={(routerProps) => {
                                        return this.state.status ?
                                        <Redirect key="login" to="/login" />
                                        : <OtherUser {...routerProps} />;
                                    }} 
                                />
                                <Route 
                                    exact={true}
                                    path="/user/:user"
                                    render={(routerProps) => {
                                        return this.state.status ?
                                        <Redirect key="login" to="/login" />
                                        : <Profil {...routerProps} />;
                                    }} 
                                    userName={this.props.userName}
                                />
                                <Route 
                                    exact={true}
                                    path="/editUser"  
                                    render={(routerProps) => {
                                        return this.state.status ? 
                                        <Redirect key="login" to="/login" />
                                        : <EditProfil {...routerProps} />;
                                    }} 
                                />
                                <Route  
                                    path="/Usermanagement/:action/:guid" 
                                    key="usermanagement"
                                    render={(routerProps) => {
                                        return <Usermanagement 
                                            {...routerProps} 
                                            actionType={false}
                                            pageTitle="Forgotten Password"
                                        />;
                                    }} 
                                />
                                <Route 
                                    exact={true}
                                    path="/changePass"  
                                    render={(routerProps) => {
                                        return this.state.status ?
                                        <Redirect key="login" to="/login" />
                                        : <Usermanagement 
                                            {...routerProps} 
                                            actionType={true}
                                            pageTitle="Change Password"
                                        />;
                                    }} 
                                />
                                <Route  
                                    path="/forgottenPassword" 
                                    key="usermanagement"
                                    render={(routerProps) => {
                                        return <ForgottenPass 
                                            {...routerProps} 
                                        />;
                                    }} 
                                />
                                <Route  
                                    path="/ahievement/:user" 
                                    key="ahievement"
                                    render={(routerProps) => {
                                        return <AchievementPage 
                                            {...routerProps} 
                                        />;
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
    // (dispatch) => ({
    //     getHomeContent:    (path: string, options: any) => dispatch(Actions.requestContent( path, options )),
    // })
)(BodyComponent as any));
 