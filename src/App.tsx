import * as React                           from 'react';
import { connect }                          from 'react-redux';
import {
  Route,
  Redirect,
  withRouter,
//   Router
}                                           from 'react-router-dom';
import { Actions, Reducers }                from '@sensenet/redux';
import { LoginState }                       from '@sensenet/client-core';

import './App.css';
import './App.scss';

// import page components
import Body                                 from './components/Body';
import Profil                               from './components/Profil';
import EditProfil                           from './components/EditProfil';
// import NoMatch                              from './components/NoMatch';
import { Login }                            from './components/Login';
import { PathHelper }                       from '@sensenet/client-utils';

// save config 
const DATA = require('./config.json');

export interface AppProps {
    login: Function;
    getUserInfo: Function;
    addToState: Function;
    userName: string;
    loginState: LoginState;
    store: any;
    repository: any;
    userRoleName: string;
    updateUser: boolean;
}

class App extends React.Component<AppProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            open : false,
            user : {},
            loginState: false,
            userRoleName: this.props.userName,
            updateUser: true,
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

    componentWillReceiveProps(nextProps: AppProps) {
        this.setState({
            open : false,
            user : {},
            loginState: false,
            userRoleName: nextProps.userName,
        });
    }
    
    public render() { 

    if (this.state.userRoleName !== 'undefined' && this.state.userRoleName !== 'Visitor' && this.state.updateUser) {

        let path = PathHelper.joinPaths(DATA.ims, this.state.userRoleName);

        let userGet = this.props.getUserInfo(path, {
            select : ['Name', 'DisplayName', 'Skills', 'WorkPhone', 'Skype', 'Linkedin', 
                    'GitHub', 'JobTitle', 'Email', 'FullName', 'Description', 'Languages', 'Phone', 
                    'Gender', 'BirthDate', 'Education', 'Avatar', 'ImageRef', 'ImageData'],
        });
        
        userGet.then( (result: any) => {
            this.setState({ updateUser: false});
            this.props.addToState(result.value.d);
        });

        userGet.catch((err: any) => {
            console.log(err);
        });
    }   

    return (
        <div className={this.state.open ? 'content_to_right open' : 'content_to_right'}>
            {/* <Route component={NoMatch} /> */}
            <Route
                path="/"
                render={routerProps => {
                    const status = this.props.loginState !== LoginState.Authenticated;
                    return status ?
                        // not authenticated user is redirected to login page
                        <Redirect key="login" to="/login" />
                      : (
                        // authenticated user
                        <Body openMenu={this.openMenu}/>
                    );
                }}
            />
            <Route
                exact={true}
                path="/login"
                render={routerProps => {
                    const status = this.props.loginState !== LoginState.Authenticated;
                    return status ?
                            <Login formSubmit={this.formSubmit} />
                        :   <Redirect key="dashboard" to="/" />;
                }} 
            />
            <main className="sn_main">
                <div className="sn_wrapp">
                    <Route 
                        path={'/user:' + this.props.userName} 
                        render={ () => {
                        return (<Profil />); }}  
                    />
                    <Route 
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
        loginState:     Reducers.getAuthenticationStatus(state.sensenet),
        userName :      state.sensenet.session.user.userName,
    };
};

export default withRouter(connect(
    mapStateToProps,
    (dispatch) => ({
        // new added action
        login:          (username: string, password: string) => dispatch(Actions.userLogin(username, password)),
        getUserInfo:    (path: string, options: any) => dispatch(Actions.loadContent( path, options )),
        addToState:     (userInfo: any) => dispatch({ type: 'UPDATE_LOGINED_USER', payload: userInfo }),
    })
)(App as any));