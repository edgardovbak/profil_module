import * as React                           from 'react';
import { connect }                          from 'react-redux';
import {
  Route,
  Redirect,
  withRouter
}                                           from 'react-router-dom';
import { Actions, Reducers }                from '@sensenet/redux';
import { Authentication }                   from 'sn-client-js';
// import { Authentication }                       from '@sensenet/client-core';

import './App.css';
import './App.scss';

// import page components
import Sidebar                              from './components/Sidebar';
import Header                               from './components/Header';
import Profil                               from './components/Profil';
import EditProfil                           from './components/EditProfil';
import { Login }                            from './components/Login';

interface AppProps {
    login: Function;
    UserInfo: Function;
    userName: string;
    loginState: Authentication.LoginState;
    repo: any;
}

class App extends React.Component<AppProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            open : false,
            user : {},
            loginState: false,
        },

        this.formSubmit = this.formSubmit.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    formSubmit(e: Event, email: string, password: string) {
            this.props.login(email, password);
    }

    openMenu() {
        let menuState = !this.state.open;
        this.setState({
            open: menuState
          });
    }
    
  render() {

    // let path = DATA.ims + this.props.userName;
    
    // let userGet = this.props.UserInfo(path, {
    //     select : ['Name', 'DisplayName']
    // });
    // console.log(userGet);

    return (
        <div className={this.state.open ? 'content_to_right open' : 'content_to_right'}>
            <Route
                authorize={['admin']}
                path="/"
                render={routerProps => {
                    const status = this.props.loginState !== Authentication.LoginState.Authenticated;
                    return status ?
                        // not authenticated user is redirected to login page
                        <Redirect key="login" to="/login" />
                      : (
                        // authenticated user
                        <div>
                            <Header />
                            <Sidebar openMenu={this.openMenu}/>
                            <div className="sn_overflow" onClick={this.openMenu} />
                        </div>
                    );
                }}
            />
            <Route
                exact={true}
                path="/login"
                render={routerProps => {
                    const status = this.props.loginState !== Authentication.LoginState.Authenticated;
                    return status ?
                            <Login formSubmit={this.formSubmit} />
                        :   <Redirect key="dashboard" to="/" />;
                }} 
            />
            <main className="sn_main">
                <div className="sn_wrapp">
                    <Route 
                        authorize={['admin']}
                        path={'/user/' + this.props.userName} 
                        render={ () => {
                        return (<Profil />); }}  
                    />
                    <Route 
                        authorize={['admin']}
                        path="/edituser" 
                        render={ () => {
                        return (<EditProfil />); }}  
                    />
                </div>
            </main>
        </div>
    );
  } 
}

const mapStateToProps = (state: any, match: any) => {
  return {
    loginState: Reducers.getAuthenticationStatus(state.sensenet),
    userName : state.sensenet.session.user.userName,
  };
};

export default withRouter(connect(
    mapStateToProps,
    (dispatch) => ({
        // new added action
        login: (username: string, password: string) => dispatch(Actions.userLogin(username, password)),
        UserInfo:  (path: string) => dispatch(Actions.requestContent( path )),
    })
)(App));