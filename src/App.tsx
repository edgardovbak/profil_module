import * as React                           from 'react';
import { connect }                          from 'react-redux';
import {
  Route,
  Redirect,
//   Switch,
  withRouter,
  Router
}                                           from 'react-router-dom';
import { Actions, Reducers }                from '@sensenet/redux';
import { LoginState }                       from '@sensenet/client-core';

import './App.css';
import './App.scss';

// import page components
import Body                                 from './components/Body';
// import Profil                               from './components/Profil';
// import EditProfil                           from './components/EditProfil';
import NoMatch                              from './components/NoMatch';
import { Login }                            from './components/Login';
import TestUserRoute                        from './components/TestUserRoute';
import OtherUser                            from './components/OtherUser';

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
            user : {},
            loginState: false,
            userRoleName: this.props.userName,
            updateUser: true,
        },

        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e: Event, email: string, password: string) {
        this.props.login(email, password);
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
    
    // important 
    // status - it's a boolean value about user authentication state
    const status = this.props.loginState !== LoginState.Authenticated;

    return (
        <div>
            <Router>
                <Route 
                    exact={true} 
                    path="/"    
                    render={ () => {
                        return  (
                            <Body />
                        );
                    }}
                    key="dashboard"
                /> 
                    <Route 
                        exact={true} 
                        path="/login"   
                        children={routerProps => {
                            return status ?
                                    <Login formSubmit={this.formSubmit} />
                                :   <Redirect key="dashboard" to="/" />;
                        }} 
                    />
                
                    <Route 
                        path="/otherUser/:seeAll"  
                        render={(routerProps) => {
                            return status ?
                            <Redirect key="login" to="/login" />
                            : <OtherUser {...routerProps} />;
                        }} 
                    />
                    <Route 
                        path="/user/:user"  
                        // component={TestUserRoute}
                        render={(routerProps) => {
                            return status ?
                            <Redirect key="login" to="/login" />
                            : <TestUserRoute {...routerProps} />;
                        }} 
                    />
                    {/* when none of the above match, <NoMatch> will be rendered */}
                    <Route 
                        component={NoMatch} 
                    /> 
                </Route>  
            </Router>;
        </div>;
    )
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