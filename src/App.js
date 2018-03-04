import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import {
  Route,
  Redirect,
  withRouter
}                               from 'react-router-dom';
import { Authentication,ContentTypes }       from 'sn-client-js';
import { Actions, Reducers }    from 'sn-redux';

import './App.css';
import './App.scss';

// import page components
import Sidebar                  from './components/Sidebar';
import Header                   from './components/Header';
import Main                     from './components/Main';
import { Login }                from './components/Login';



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
        // filter: ["isof('User')","LoginName eq 'admin'"],
        select: ['Name', 'DisplayName', "JobTitle", "Email", "FullName", "Description", "Languages", "Phone", "Gender", "BirthDate", "Education"],
    }).subscribe(loadedTask => {
        console.log('Task loaded', loadedTask);
        // this.setState({user: myTask});
    }, error => console.error);

    console.log('Task loaded   lol ',  this.state.user);
    
    return (
        <div>
            <Route
                exact={true}
                path="/"
                render={routerProps => {
                    const status = this.props.loginState !== Authentication.LoginState.Authenticated;
                    return status ?
                      <Redirect key="login" to="/login" />
                      : (
                        <div className="content_to_right">
                            <Header />
                            <Sidebar />
                            <Main />
                        </div>
                      );
                }}
            />
            <Route
                path="/login"
                render={routerProps => {
                    const status = this.props.loginState !== Authentication.LoginState.Authenticated;
                    return status ?
                      <Login formSubmit={this.formSubmit} />
                      : <Redirect key="dashboard" to="/" />;
                }}
            />
        </div>
    );
  }
}



const mapStateToProps = (state, match) => {
  return {
    loginState: Reducers.getAuthenticationStatus(state.sensenet),
    userName : state.sensenet.session.user.userName,
    user : state.user
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    login: Actions.UserLogin,
 })(App));
