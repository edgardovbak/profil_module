import React                                from 'react';
import ReactDOM                             from 'react-dom';
import { Provider }                         from 'react-redux';
import { composeWithDevTools }              from 'redux-devtools-extension';
import { applyMiddleware  }                 from 'redux';
import thunk                                from 'redux-thunk';
import './index.css';
import App                                  from './App';
import { combineReducers }                  from 'redux';
import { Repository }                       from 'sn-client-js';

import { Store, Actions, Reducers }         from 'sn-redux';

import user                                 from './reducers/users';

import {
  HashRouter as Router
}                                           from 'react-router-dom';

const sensenet = Reducers.sensenet;
const myReducer = combineReducers({
  sensenet,
  user
});

const repository = new Repository.SnRepository({
  RepositoryUrl: 'https://profil_sn7'
});

const store = Store.configureStore(
    myReducer,
    undefined,
    undefined,
    composeWithDevTools(applyMiddleware(thunk)),
    repository
);
// important
store.dispatch(Actions.InitSensenetStore('/Root/Sites/Profil', { select: 'all' }));



ReactDOM.render(
    <Provider store={store}>
        <Router basename="/">
            <App repo={repository}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
