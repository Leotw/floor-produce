/**
 * Created by tiwenleo on 17/10/6.
 */
import loginApi from "../../utils/api";

const USER_REQUEST_STARTED = 'USER_REQUEST_STARTED';
const LOAD_USER = 'LOAD_USER';

const userRequest = (login) => ({
  ['callFetch']: {
    types: [USER_REQUEST_STARTED, LOAD_USER],
    url: `${loginApi}${login}`,
    login
  }
});

const STARRED_REQUEST_STARTED = 'STARRED_REQUEST_STARTED';
const LOAD_STARRED_REPO = 'LOAD_STARRED_REPO';

const starredRepoRequest = (login) => ({
  ['callFetch']: {
    types: [STARRED_REQUEST_STARTED, LOAD_STARRED_REPO],
    url: `${loginApi}${login}`,
    login
  }
});


export { userRequest, starredRepoRequest };
