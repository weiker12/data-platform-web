import React from 'react';
import {Layout, Menu} from 'antd';
import styles from '../../index.less';
import {history} from 'umi';

const {Sider} = Layout;

export default () => {
  const go = (url: String) => {
    history.push(url);
  };
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className={styles['nav-title']}>数据报表平台</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={
          history.location.pathname.indexOf('/admin/source') !== -1
            ? ['1']
            : history.location.pathname.indexOf('/admin/api') !== -1
            ? ['2']
            : ['0']
        }
      >
        <Menu.Item
          key="1"
          // icon={<UserOutlined />}
          onClick={() => go('/admin/source')}
        >
          数据源查询
        </Menu.Item>
        <Menu.Item
          key="2"
          // icon={<UserOutlined />}
          onClick={() => go('/admin/api')}
        >
          接口查询
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
