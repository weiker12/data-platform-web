import {request} from 'utils/request';

export default {
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
};
