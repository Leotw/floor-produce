# real-produce
action in redux applyMiddleware

## introduce

#### synchronization actions 


synchronization actions are function for activating asynchronous actions those in ` applyMiddleware `:

```shell
// action.js
const USER_REQUEST_STARTED = 'USER_REQUEST_STARTED';
const LOAD_USER = 'LOAD_USER';

const userRequest = (login) => ({
  ['callFetch']: {
    types: [USER_REQUEST_STARTED, LOAD_USER],
    url: `${loginApi}${login}`,
    login
  }
});
```

#### asynchronization actions

synchronization actions those in ` applyMiddleware ` would be triggered by ` next ` 

```shell
// api.js

const getFetchData = (next) => {
  request()
    .then(res => {
      return next({
        type: 'SOME_TYPES',
        someData
      });  // asynchronization actions would be triggered
    })
    .catch(err => {
      // other actions
    });
};

export default ({getState, dispatch}) => (next) => (action) => {
  console.log('This is from middleware api::');
  const callFetch = action['callFetch'];
  if (!callFetch) {
    return next(action);
  }
  const {types, url, login} = callFetch;
  const [requestStarted,requestSuccess] = types;
  if (requestStarted === 'USER_REQUEST_STARTED') {
    next({type: requestStarted});
    getFetchData(next);
    // do...
  } else if (requestStarted === 'STARRED_REQUEST_STARTED') {
    next({type: requestStarted});
    getFetchData(next);
    // do...
  }
}
```

in this file, the `action` whose key is 'callFetch' would be triggered.

#### applyMiddleware

synchronization actions would


```
// store.js
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducer";
import api from "../middleware/api"; // api.js

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  api, // in applyMiddleware
  createLogger(),
)(createStore);
```
