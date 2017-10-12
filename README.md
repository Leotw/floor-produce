# floor-produce
action in redux applyMiddleware | 在调用链中触发action

## Profile

#### synchronization actions 


synchronization action  function used for activating asynchronous action in ` api.js `  which is composed in ` applyMiddleware  `:

```js
// action.js
const USER_REQUEST_STARTED = 'USER_REQUEST_STARTED';
const LOAD_USER = 'LOAD_USER';

// export for components to use
export const userRequest = (login) => ({
['callFetch']: {
    types: [USER_REQUEST_STARTED, LOAD_USER],
    url: `${loginApi}${login}`,
    login
  }
});

```

#### asynchronization actions

some actions in ` api.js ` will be triggered by ` next `. In this file, the `action` it's key called 'callFetch' will be triggered, but it is not factual action or asyn action and just originates other actions functions to execute, these actions will be triggered by ` next `.

```js
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

// export for applyMiddleware to catch all actions contain asyn actions
export default ({getState, dispatch}) => (next) => (action) => {
  console.log('This is from middleware api::');
  const callFetch = action['callFetch']; // catch action whose key called callFetch, you could also regard as an Object  
  if (!callFetch) {
    return next(action);
  }
  const {types, url, login} = callFetch;
  const [requestStarted, requestSuccess] = types;
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


#### applyMiddleware

`api.js`  must be composed in ` applyMiddleware  ` that work as expected.

```js
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


