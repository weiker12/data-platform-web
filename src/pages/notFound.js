import {connect} from 'dva';
import React from 'react';
import {Link} from 'dva/router';

function NotFound(props) {
  const {frame} = props;
  const {envLabel} = frame;
  return (
    <div id="content" className="warn-wrapper-content">
      <div className="warn-wrapper">
        <div className="warn-image notfound-empty" />
        <div className="warn-label">哎呀，您访问的页面找不到啦~</div>
        {envLabel === 'GA' ? (
          <a
            className="ant-btn-primary ant-btn axg-link-like-button"
            href={window.CIM_DOMAIN}
          >
            返回首页
          </a>
        ) : (
          <Link className="ant-btn-primary ant-btn axg-link-like-button" to="/">
            返回首页
          </Link>
        )}
      </div>
    </div>
  );
}

NotFound.propTypes = {};

export default connect(({frame}) => ({frame}))(NotFound);
