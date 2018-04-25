import * as React                           from 'react';
import { connect }                          from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  withRouter,
}                                           from 'react-router-dom';
import { Actions, Reducers }                from '@sensenet/redux';
import { LoginState }                       from '@sensenet/client-core';
import './App.css';
import './App.scss';
import Body                                 from './components/Body';
import { Login }                            from './components/Login';

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
            // userRoleName: this.props.userName,
            updateUser: true,
        },

        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e: Event, email: string, password: string) {
        this.props.login(email, password);
    }

    public render() {  
    
    // important 
    // status - it's a boolean value about user authentication state
    const status = this.props.loginState !== LoginState.Authenticated;

    return (
        <div>
            <Switch>
                <Route 
                    exact={true} 
                    path="/login"   
                    render={routerProps => {
                        return status ?
                                <Login formSubmit={this.formSubmit} />
                            :   <Redirect key="dashboard" to="/" />;
                    }} 
                />
                <Route 
                    path="/" 
                    key="dashboard"
                    render={(routerProps) => {
                        return (<Body {...routerProps} />);
                    }} 
                /> 
                
            </Switch> 
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
    })
)(App as any));