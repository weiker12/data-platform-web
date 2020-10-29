import {request} from 'utils/request';

export default {
  getDict(data) {
    return request(`/v1/getDict`, {
      method: 'GET',
      data,
    });
  },
  getDataSourceList(data) {
    return request(`/v1/getDataSourceList`, {
      method: 'POST',
      data,
    });
  },
  getDataSource(data) {
    return request(`/v1/getDataSource`, {
      method: 'GET',
      data,
    });
  },
  saveDataSource(data) {
    return request(`/v1/saveDataSource`, {
      method: 'POST',
      data,
    });
  },
  delDataSource(data) {
    return request(`/v1/delDataSource`, {
      method: 'POST',
      data,
    });
  },
};
