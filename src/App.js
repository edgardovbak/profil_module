import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import {
  Route,
  Redirect,
  withRouter
}                               from 'react-router-dom';
import { Authentication }       from 'sn-client-js';
import { Actions, Reducers }    from 'sn-redux';

import './App.css';
import './App.scss';

// import page components
import Sidebar                  from './components/Sidebar';
import Header                   from './components/Header';
import Profil                   from './components/Profil';
import EditProfil               from './components/EditProfil';
import { Login }                from './components/Login';

// import pageActions              from './actions/index';



// new action


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : {}
        }

        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e, email, password) {
        this.props.login(email, password);
    }

  render() {

    let myTask = this.props.repo.Load('/Root/IMS/BuiltIn/Portal/'+this.props.userName, {
        select: ['Name', 'DisplayName', "JobTitle", "Email", "FullName", "Description", "Languages", "Phone", "Gender", "BirthDate", "Education"],
    }).subscribe(loadedTask => {

        if(Object.getOwnPropertyNames(this.state.user).length === 0) {
            this.setState({ user: loadedTask});
            this.props.onAddTrack(loadedTask);
        }
    }, error => console.error);

    return (
        <div className="content_to_right">
            <Route
                path="/"
                render={routerProps => {
                    const status = this.props.loginState !== Authentication.LoginState.Authenticated;
                    return status ?
                      <Redirect key="login" to="/login" />
                      : (
                        <div>
                            <Header/>
                            <Sidebar/>
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
                      : <Redirect key="dashboard" to="/" />;
                }}
            />
            <main className="main">
                <div className="wrapp">
                    <Route path={"/user/"+this.props.userName} render={ () => {
                        return <Profil  />
                    }}  />
                    <Route path="/edituser" render={ () => {
                        return <EditProfil />
                    }}  />
                </div>
            </main>
        </div>
    );
  }
} 

const mapStateToProps = (state, match) => {
  return {
    loginState: Reducers.getAuthenticationStatus(state.sensenet),
    userName : state.sensenet.session.user.userName,
  };
};

export default withRouter(connect(
    mapStateToProps,
    dispatch => ({
        onAddTrack: (usertt) => {
            dispatch({ type: 'UPDATE_LOGINED_USER', payload: usertt })
        },
        login: Actions.UserLogin,
    })
)(App));
