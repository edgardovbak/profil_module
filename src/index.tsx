import * as React                           from 'react';
import * as ReactDOM                        from 'react-dom';
import { Provider }                         from 'react-redux';
import { combineReducers }                  from 'redux';
import './index.css';

import { Reducers, Store }                  from '@sensenet/redux';
import { Repository }                       from '@sensenet/client-core';
import { JwtService }                       from '@sensenet/authentication-jwt';

// custrom  reducers  
import user                                 from './reducers/users';
import userImage                            from './reducers/userImage';

import { BrowserRouter }                    from 'react-router-dom';

import App                                  from './App';
 
// save config 
const DATA = require('./config.json');
 
const sensenet = Reducers.sensenet;
const myReducer = combineReducers({
  sensenet,

  // new added reducer
  user, 
  userImage,
});

const repository = new Repository ({
    repositoryUrl: DATA.domain
});
const jwtService = new JwtService(repository);
jwtService.checkForUpdate();

const options = {
    rootReducer: myReducer,
    repository,
} as Store.CreateStoreOptions;
  
const store = Store.createSensenetStore(options);

ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter basename="/">
                <App />
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
);