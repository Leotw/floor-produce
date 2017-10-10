// es6 Promise polyfill
import Promise from 'es6-promise'
import {env, token, zoneCode} from '../config/env'
import '../3rd/seed'

const currEnv = env.split(';')[0];
const currHost = env.split(';')[1];
const isNative = window.App; // naitve flag

/**
 * 为Promise扩充done 总是处于回调链最底端 保证抛出任何可能出现的异常
 * @param  {[type]} onFulfilled [description]
 * @param  {[type]} onRejected  [description]
 * @return {[type]}             [description]
 */
Promise.prototype.done = function(onFulfilled, onRejected) {
  this.then(onFulfilled)
  .catch(function(reason) {
    setTimeout(() => {
        throw reason;
    }, 0)
  })
};

const request = (type, url, params) => {

  // http promise flag
  let hasCanceled_ = false;

  let promise = new Promise((resolve, reject) => {

    type = typeof type === 'string' && type.toUpperCase();
    params = params || {};
    // select request type
    switch (true) {
      case type === 'GET' && currEnv !== 'native':

        let p = '?'; // ‘?a=xxx&b=yyy’
        for (let o in params) {
          p += o + '=' + params[o] + '&';
        }
        p = p.slice(0, -1);
        // get & http
        if (currHost.match(/http/g)) {
          url = currHost + url + p;
        }
        // proxy && native 不做任何处理
        break;

      case type === 'POST':
        // post & http
        if (currHost.match(/http/g)) {
          url = currHost + url;
        }
        // proxy && native 不做任何处理
        break;

      default:
    }

    /**
     * 区分环境执行Request
     */
    const execute = () => {

      if (isNative) {

        const reqBody = {
          url    : url,
          type   : type,
          data   : params,
          success: resolve,
          error  : reject
        }

        typeof $$.Native.request === 'function' && $$.Native.request(reqBody);

      } else {

        const handler = function() {

          if (this.readyState !== 4) return;
            console.log('XMLHttpRequest::: ', this);

          if (this.status === 200) {
            resolve(this.response);
          } else {
            // alert('this.status:::' + this.status)
            // alert(JSON.stringify(this));
            reject({hasCanceled_: true, msg: this.statusText})
          }

        };
// alert('url:::' + url)
        let client = new XMLHttpRequest();
        client.open(type, url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        // client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        client.setRequestHeader('Accept', 'application/json');
        // client.setRequestHeader('Token', token);
        // client.setRequestHeader('zoneCode', zoneCode);
        client.send(type === 'POST' ? JSON.stringify(params) : null);

      }
    }

    execute();

  })

  promise.then((data) =>
    hasCanceled_ ? reject({hasCanceled_: true}) : resolve(data)
  );

  promise.catch((error) =>
    hasCanceled_ ? reject({hasCanceled_: true, error}) : reject(error)
  );

  return {
    promise: promise,
    cancel() {
      hasCanceled_ = true;
    }
  };

}

export default request;
