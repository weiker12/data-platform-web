import React, {useContext, useEffect} from 'react';
import {Layout, message} from 'antd';
import styles from './index.less';
import CustomHeader from '@/pages/frame/components/header/index';
import CustomSider from '@/pages/frame/components/sider/index';
import CustomBreadcrumb from '@/components/breadcrumb';
import Service from './service';
import GlobalContext from '@/common/utils/context/globalContext';

const {Header, Content} = Layout;

export interface IProps {
  children: React.ReactNode;
}

export default (props: IProps) => {
  return (
    <Layout className={styles.layout}>
      <CustomSider />
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{padding: 0}}
        >
          <CustomHeader />
        </Header>
        <Content style={{margin: '24px 16px'}}>
          <div
            className="site-layout-background"
            style={{padding: 24, height: '100%'}}
          >
            <div style={{marginBottom: '20px'}}>
              <CustomBreadcrumb />
            </div>
            <div style={{height: 'calc(100% - 60px)', overflow: 'scroll'}}>
              {props.children}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
