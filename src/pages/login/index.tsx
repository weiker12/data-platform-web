import React from 'react';
import './index.less';
// import ic_title from '@/assets/images/ic_title.png';
import ic_page from '@/assets/images/ic_page.png';
import qrcode from '@/assets/images/qrcode.png';
import LoginForm from './loginForm';

export default () => {
  return (
    <div className="login">
      <div className="login-main">
        <img className="login-main-img" src={ic_page} alt="" />
        <div className="login-main-right">
          <span className="login-main-title">数据报表平台</span>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
