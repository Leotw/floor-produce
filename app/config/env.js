// http server host
const server = {
  mock  : 'mock;http://localhost:7709',
  stage : 'stage;https://api.github.com/',
  prod  : 'prod;https://xxx.xxxxx.com.cn',
  proxy : 'proxy;', // webpack http-proxy-middleware
  native: 'native;',
}

///////////////////////////////////////////////
// 选择调试server
// export const env = server.mock;
export const env = server.stage;
// export const env = server.prod;
// export const env = server.proxy;
// export const env = server.native;
///////////////////////////////////////////////

// add token
export const token = '4c9fa540de3347df9ddb91907114fa57';
export const zoneCode = '0575';
