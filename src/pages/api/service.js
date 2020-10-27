import {request} from 'utils/request';

export default {
  getApiInfoList(data) {
    return request(`//v1/getApiInfoList`, {
      method: 'POST',
      data,
    });
  },
  getApiInfo(data) {
    return request(`/v1/getApiInfo`, {
      method: 'GET',
      data,
    });
  },
  getDict(data) {
    return request(`/v1/getDict`, {
      method: 'GET',
      data,
    });
  },
  saveApiInfo(data) {
    return request(`/v1/saveApiInfo`, {
      method: 'POST',
      data,
    });
  },
  delApiInfo(data) {
    return request(`/v1/delApiInfo`, {
      method: 'POST',
      data,
    });
  },
  getSqlInfo(data) {
    return request(`/v1/getSqlInfo`, {
      method: 'POST',
      data,
    });
  },
};
