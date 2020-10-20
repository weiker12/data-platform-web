import React from 'react';
import styles from './index.less';
import Service from '../../service';
import {message} from 'antd';
import useGlobalLoading from '@/common/utils/hooks/useGlobalLoading';
import {history} from 'umi';

export default () => {
  const localUser = window.sessionStorage.getItem('userInfo');
  const userInfo = localUser ? JSON.parse(localUser) : {};
  const {showLoading, hideLoading} = useGlobalLoading();
  const {logout} = Service;
  const handleLogout = async () => {
    window.sessionStorage.removeItem('jwtToken');
    window.sessionStorage.removeItem('userInfo');
    window.sessionStorage.removeItem('routeList');
    history.push('/login');
  };

  return (
    <div className={styles.title}>
      <div className={styles.username}>{userInfo.cellphone}</div>
      <div className={styles.logout} onClick={handleLogout}>
        退出
      </div>
    </div>
  );
};
