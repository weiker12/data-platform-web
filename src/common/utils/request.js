import {message} from 'antd';
import _ from 'underscore';
import {APP_URL_PREFIX, API_BASE_URL} from '@/common/global/const';
import getQueryStrings from 'utils/getQueryStrings';
let Ajax = require('axios');

const getQueryStringsData = getQueryStrings(window.location.href);

// 允许跨域写入cookie
// Ajax.defaults.withCredentials = true;

const delayCloseTime = 5;

Ajax.defaults.baseURL = API_BASE_URL.api || 'http://localhost:8080';

const prefix = '/data-platform';

const info = function info(error, text) {
  message.error(
    (error &&
      error.response &&
      error.response.data &&
      error.response.data.msg) ||
      text ||
      '服务器错误',
    delayCloseTime,
  );
};

const httpStatus = {
  403(error) {
    if (error && error.response && error.response.data) {
      const {data} = error.response;
      if (data.msg) {
        info(error);
      } else {
        info(error, '权限错误');
      }
    } else {
      info(error, '权限错误');
    }
  },
  401() {
    info('', '账号登录失效');
    // window.location.href = `${APP_URL_PREFIX}/login`;
  },
  417() {
    window.location.reload();
  },
  // 500() {
  //   window.location.href = `${APP_URL_PREFIX}/systemError`;
  // },
  502() {
    window.location.href = `${APP_URL_PREFIX}/systemError`;
  },
  504() {
    window.location.href = `${APP_URL_PREFIX}/systemError`;
  },
};

function errorHandle(error) {
  const code = error && error.response && error.response.status;
  let err;
  if (code && httpStatus[code]) {
    err = httpStatus[error.response.status](error);
  } else {
    info(error, '服务器错误');
  }
  return err ? {error: err} : {error};
}

function commonRequest(url, options, urlPrefix = '') {
  const newOptions = JSON.parse(JSON.stringify(options));
  if ((newOptions.method === 'GET' || !newOptions.method) && newOptions.data) {
    newOptions.params = newOptions.data;
    newOptions.data = null;
  }

  if (
    (newOptions.method === 'POST' || newOptions.method === 'PUT') &&
    !newOptions.data &&
    newOptions.params
  ) {
    newOptions.data = newOptions.params;
    newOptions.params = null;
  }
  let headers = {};
  if (newOptions && newOptions.headers) {
    ({headers} = newOptions);
  }
  // 用户标识
  let jwtToken = '';
  if (window.sessionStorage.getItem('jwtToken')) {
    jwtToken = window.sessionStorage.getItem('jwtToken');
  } else {
    if (getQueryStringsData && getQueryStringsData['Jwt-Token']) {
      // alert(getQueryStringsData['Jwt-Token'])
      jwtToken = getQueryStringsData['Jwt-Token'];
      window.sessionStorage.setItem(
        'userInfo',
        getQueryStringsData['userInfo'],
      );
    } else {
      jwtToken = window.sessionStorage.getItem('jwtToken') || '';
    }
  }
  headers['Jwt-Token'] = jwtToken;

  const timeStamp = new Date().getTime();
  const query = url.indexOf('?') >= 0 ? '&' : '?';
  const sendMethod = (newOptions.method || 'GET').toLocaleUpperCase();

  let sendData = {
    ...newOptions.data,
  };
  let sendParams = {
    ...newOptions.params,
  };
  // 请求时间戳
  let withTimeStamp = `${query}_t=${timeStamp}`;

  return Ajax({
    method: newOptions.method || 'GET',
    url: `${urlPrefix}${url}${withTimeStamp}`,
    data: sendData || {},
    params: sendParams || {},
    headers: {
      ...headers,
      'Content-Type':
        sendMethod === 'POST'
          ? 'application/json'
          : 'application/x-www-form-urlencoded',
    },
  })
    .then(res => {
      // 保存用户标识
      let jwtToken = '';
      if (getQueryStringsData && getQueryStringsData['Jwt-Token']) {
        jwtToken = getQueryStringsData['Jwt-Token'];
      } else {
        jwtToken = res.headers['jwt-token'] || res.headers['Jwt-Token'];
      }
      // jwtToken = res.headers['jwt-token'] || res.headers['Jwt-Token']
      if (jwtToken) {
        window.sessionStorage.setItem('jwtToken', jwtToken);
        if (getQueryStringsData && getQueryStringsData['Jwt-Token']) {
          delete getQueryStringsData['Jwt-Token'];
          delete getQueryStringsData['userInfo'];
          let newSearch = [];
          for (let i = 0; i < Object.keys(getQueryStringsData).length; i++) {
            newSearch.push(
              Object.keys(getQueryStringsData)[i] +
                '=' +
                getQueryStringsData[Object.keys(getQueryStringsData)[i]],
            );
          }
          window.location.search = '?' + newSearch.join('&');
        }
      }
      // 返回数据处理
      const {data} = res;
      if (data.success || data.code === 200 || data.code === '200') {
        return {data: data.data, success: true};
      }
      const resp = {};
      if (data.msg || data.message) {
        resp.globalError = data.msg || data.message;
      }
      if (data.errorCode) {
        resp.errorCode = data.errorCode;
      }
      if (data.fieldErrors) {
        resp.fieldErrors = data.fieldErrors;
      }
      if (data.code === 401 || data.code === '401') {
        info('', '账号登录失效');
        setTimeout(() => {
          window.sessionStorage.removeItem('jwtToken');
          window.sessionStorage.removeItem('userInfo');
          window.sessionStorage.removeItem('routeList');
          window.sessionStorage.removeItem('course');
          // window.location.href = `${APP_URL_PREFIX}/login`;
        }, 1000);
      }
      if (data.errorCode === 403) {
        window.location.href = `${APP_URL_PREFIX}/unauth`;
      }
      if (data.errorCode === 417) {
        window.location.reload();
      }
      return {...resp, data: data.data, success: false};
    })
    .catch(error => errorHandle(error));
}

export function request(url, options, reqPrefix = prefix) {
  return commonRequest(url, options, reqPrefix);
}
