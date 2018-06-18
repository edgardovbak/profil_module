import * as React                           from 'react';
import { connect }                          from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  withRouter,
}                                           from 'react-router-dom';
import { Actions }                          from '@sensenet/redux';
import { LoginState }                       from '@sensenet/client-core';
import './App.css';
import Body                                 from './components/Body';
import Login                                from './components/Login';

export interface AppProps {
    login: Function;
    userName: string;
    loginState: LoginState;
    store: any;
    repository: any;
}

class App extends React.Component<AppProps, any> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            status: this.props.loginState !== LoginState.Authenticated
        };
        // this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    // public formSubmitHandler(email: string, password: string) {
    //     this.props.login(email, password); 
    // }

    public render() {  
        
    console.log(this.props.loginState);
    console.log(LoginState.Authenticated);
    return (
        <div>
            <Switch>
                <Route 
                    exact={true}  
                    path="/login"   
                    render={routerProps => { 
                        return this.state.status ?
                                // <Login formSubmit={this.formSubmitHandler} />
                                <Login {...routerProps} />
                            :   <Redirect key="dashboard" to="/" />;
                    }} 
                    // render={routerProps => { 
                    //     return <Login formSubmit={this.formSubmitHandler} />;
                    // }} 
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

export const mapStateToProps = (state: any, match: any) => {
    return {
        loginState:     state.sensenet.session.loginState,
        userName :      state.sensenet.session.user.userName,
    };
};

export default withRouter(connect(
    mapStateToProps,
    (dispatch) => ({
        login:          (username: string, password: string) => dispatch(Actions.userLogin(username, password)),
    })
)(App as any));