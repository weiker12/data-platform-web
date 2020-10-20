import {connect} from 'dva';
import React from 'react';
import {Link} from 'dva/router';
import {PAGE_URL_PREFIX} from 'common/global/const';

function Page() {
  return (
    <div id="content" className="warn-wrapper-content">
      <div className="warn-wrapper">
        <div className="warn-image system-error" />
        <div className="warn-label">哎呀，系统出错啦，请稍后重试~</div>
        <Link
          className="ant-btn-primary ant-btn axg-link-like-button"
          to={`${PAGE_URL_PREFIX}`}
        >
          重试
        </Link>
      </div>
    </div>
  );
}

Page.propTypes = {};

export default connect()(Page);
