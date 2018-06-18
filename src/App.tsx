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
import { Login }                            from './components/Login';
// import Usermanagement                       from './components/Usermanagement';

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
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    public async formSubmitHandler(email: string, password: string) {
        await this.props.login(email, password); 
    }

    public render() {  
    
    // !important 
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
                                <Login formSubmit={this.formSubmitHandler} />
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