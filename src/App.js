import React, { Component }                 from 'react';
import { connect }                          from 'react-redux';
import {
  Route,
  Redirect,
  withRouter
}                                           from 'react-router-dom';


import { Authentication }                   from 'sn-client-js';
import { Actions, Reducers }                from 'sn-redux';

import './App.css';
import './App.scss';

// import page components
import Sidebar                              from './components/Sidebar';
import Header                               from './components/Header';
import Profil                               from './components/Profil';
import EditProfil                           from './components/EditProfil';
import { Login }                            from './components/Login';

// config file
import DATA                                 from './config.json';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false
        }

        this.formSubmit = this.formSubmit.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    formSubmit(e, email, password) {
        this.props.login(email, password);
    }

    openMenu() {
        let menuState = !this.state.open;
        this.setState({
            open: menuState
          })
    }

  render() {

    this.props.repo.Load(DATA.ims + this.props.userName, {
        select: ['Name', 'DisplayName', "Skils", "WorkPhone", "Skype", "Linkedin", "GitHub", "JobTitle", "Email", "FullName", "Description", "Languages", "Phone", "Gender", "BirthDate", "Education"],
    }).subscribe(loadedTask => {

            // call custom created action
            this.props.UserImage(loadedTask.Avatar);
            this.props.UserInfo(loadedTask);
        
    }, error => console.error);

    return (
        <div className={this.state.open ? "content_to_right open" : 'content_to_right'   }>
            <Route
                path="/"
                render={routerProps => {
                    const status = this.props.loginState !== Authentication.LoginState.Authenticated;
                    return status ?
                      <Redirect key="login" to="/login" />
                      : (
                        <div>
                            <Header/>
                            <Sidebar openMenu={this.openMenu}/>
                            <div className="sn_overflow" onClick={this.openMenu}></div>
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
            <main className="sn_main">
                <div className="sn_wrapp">
                    <Route path={"/user/"+this.props.userName} render={ () => {
                        return <Profil repo={this.props.repo} />
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
    {
        login: Actions.UserLogin,

        // new added action
        UserInfo:   (userInfo) => ({ type: 'UPDATE_LOGINED_USER', payload: userInfo }),
        UserImage:  (userImage) => ({ type: 'GET_USER_IMAGE', payload: userImage })
    }
)(App));
