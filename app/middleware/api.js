/**
 * Created by tiwenleo on 17/10/7.
 */
import request from "../utils/request";

const getNextPage = (getState, login) => {
  return getState().starredRepo.pagination[login] || 1
};

const getRepos = (getState) => {
  return getState().starredRepo.repos || [];
};

const getFetchData = (opt) => {
  const {next, login, nextPage, repos, requestSuccess, url, callback} = opt;
  callback && callback();
  let tmpObj = null;
  request('get', url).promise
    .then(res => {
      Object.prototype.toString.call(res) === '[object Array]' ? res = res || [] : res = res || {};
      requestSuccess === 'LOAD_STARRED_REPO' ? tmpObj = {
        pagination: {
          [login]: nextPage + 1,
        },
        repos: [...repos, ...res]
      } : tmpObj = res;
      return next({
        type: requestSuccess,
        response: tmpObj
      });
    })
    .catch(error => {
      return next({
        type: requestSuccess,
        error: typeof error === 'object' ? JSON.stringify(error) : error
      });
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
    getFetchData({next, login, requestSuccess, url});
  } else if (requestStarted === 'STARRED_REQUEST_STARTED') {
    next({type: requestStarted});
    let nextPage = getNextPage(getState, login);
    let repos = getRepos(getState);
    getFetchData({next, login, nextPage, repos, requestSuccess, url: `${url}/starred?page=${nextPage}`});
  }
}


