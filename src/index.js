import React                                from 'react';
import ReactDOM                             from 'react-dom';
import { Provider }                         from 'react-redux';
import { composeWithDevTools }              from 'redux-devtools-extension';
import { applyMiddleware  }                 from 'redux';
import thunk                                from 'redux-thunk';
import './index.css';
import App                                  from './App';
import { combineReducers }                  from 'redux';
// import browserHistory                       from 'ReactRouter/browserHistory';
import { Repository }                       from 'sn-client-js';

import { Store, Actions, Reducers }         from 'sn-redux';

// custrom  reducers 
import user                                 from './reducers/users';
import userImage                            from './reducers/userImage';

import { BrowserRouter }                    from 'react-router-dom';

import DATA                                 from './config.json';

const sensenet = Reducers.sensenet;
const myReducer = combineReducers({
  sensenet,

  // new added reducer
  user,
  userImage,
});

const repository = new Repository.SnRepository({
  RepositoryUrl: DATA.domain
});

const store = Store.configureStore( 
    myReducer,
    undefined,
    undefined,
    composeWithDevTools(applyMiddleware(thunk)),
    repository
);
// important
store.dispatch(Actions.InitSensenetStore(DATA.site, { select: 'all' }));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/">
            <App repo={repository}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
