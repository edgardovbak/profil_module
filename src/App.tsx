import * as React                           from 'react';
import { connect }                          from 'react-redux';
import {
  Route,
  Redirect,
  withRouter
}                                           from 'react-router-dom';
import { Actions, Reducers }                from '@sensenet/redux';
import { Authentication }                   from 'sn-client-js';

import './App.css';
import './App.scss';

// import page components
import Sidebar                              from './components/Sidebar';
import Header                               from './components/Header';
import Profil                               from './components/Profil';
import EditProfil                           from './components/EditProfil';
import { Login }                            from './components/Login';

// save config 
const DATA = require('./config.json');

export interface AppProps {
    login: Function;
    UserInfo: Function;
    UserInfoGet: Function;
    userName: string;
    loginState: Authentication.LoginState;
    store: any;
    repository: any;
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
    
    public render() { 

    if ( this.props.userName !== 'Visitor' ) { 
        let path = DATA.ims + '(\'' + this.props.userName + '\')';

        let userGet = this.props.UserInfo(path, {
            select : ['Name', 'DisplayName', 'Skils', 'WorkPhone', 'Skype', 'Linkedin', 
                    'GitHub', 'JobTitle', 'Email', 'FullName', 'Description', 'Languages', 'Phone', 
                    'Gender', 'BirthDate', 'Education'],
        });
        
        // this.props.UserInfoGet(userGet);

        console.log(userGet); 
    }

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
        UserInfo:  (path: string, options: any) => dispatch(Actions.requestContent( path, options )),
        // UserInfoGet:  (userInfo: any) => ({ type: 'UPDATE_LOGINED_USER', payload: userInfo }),
    })
)(App as any));