import {request} from 'utils/request';

export default {
  login(data) {
    return request(`/v1/login`, {
      method: 'POST',
      data,
    });
  },
  sendVrCode(data) {
    return request(`/v1/sendSmsCode`, {
      method: 'POST',
      data,
    });
  },
};
