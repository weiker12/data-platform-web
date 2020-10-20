import {connect} from 'dva';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'dva/router';

function Page(props) {
  const {id, frame} = props;
  const {envLabel} = frame;
  return (
    <div
      className="warn-wrapper-content"
      id={id || 'content'}
      style={{position: 'relative'}}
    >
      <div className="warn-wrapper">
        <div className="warn-image unauth" />
        <div className="warn-label">哎呀，您没有访问该页面的权限~</div>
        {envLabel === 'GA' ? (
          <a className="ant-btn-primary ant-btn" href={window.CIM_DOMAIN}>
            返回首页
          </a>
        ) : (
          <Link className="ant-btn-primary ant-btn" to="/">
            返回首页
          </Link>
        )}
      </div>
    </div>
  );
}

Page.propTypes = {
  id: PropTypes.number,
};

export default connect(({frame}) => ({frame}))(Page);
