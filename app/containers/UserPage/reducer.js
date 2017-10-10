/**
 * Created by tiwenleo on 17/10/6.
 */
import '../../utils/assign';

export const users = (state = {}, action) => {
  if (action.type === 'LOAD_USER' && action.response) {
    return Object.assign({}, state, action.response);
  } else {
    return state;
  }
};

export const starredRepo = (state = {
  pagination: {},
  repos: []
}, action) => {
  if (action.type === 'LOAD_STARRED_REPO') {
    return Object.assign({}, state, action.response);
  } else {
    return state;
  }
};

export const errorMessageOfUsers = (state = null, action) => {
  if ((action.type === 'LOAD_USER' || action.type === 'LOAD_STARRED_REPO') && action.error) {
    return action.error;
  } else {
    return null;
  }
};

export const fetchOfUser = (state = false, action) => {
  if (action.type === 'USER_REQUEST_STARTED') {
    return true;
  } else if (action.type === 'LOAD_USER') {
    return false;
  } else {
    return state;
  }
};

export const fetchOfRepo = (state = false, action) => {
  if (action.type === 'STARRED_REQUEST_STARTED') {
    return true;
  } else if (action.type === 'LOAD_STARRED_REPO') {
    return false;
  } else {
    return state;
  }
};
