import React, {useEffect, useState, useContext} from 'react';
import {history} from 'umi';
import Service from './service';
import useGlobalLoading from '@/common/utils/hooks/useGlobalLoading';
import {message, Modal} from 'antd';
import './index.less';

export default () => {
  const {showLoading, hideLoading} = useGlobalLoading();
  const [dataSource, setDataSource] = useState([]);
  const pageSize = 10;
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: '接口代码',
      dataIndex: 'apiCode',
    },
    {
      title: '接口名称',
      dataIndex: 'apiName',
    },
    {
      title: '接口输出类型',
      dataIndex: 'apiOutType',
    },
    {
      title: '是否通知',
      dataIndex: 'shouldInform',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>新增</a>
          <a>修改</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getDataSourceAjax({pageNumber: 1, pageSize});
  }, []);

  const getDataSourceAjax = async params => {
    showLoading();
    try {
      const res = await Service.getDataSourceList(params);
      const {data, success, globalError} = res;
      hideLoading();
      if (!success) return message.error(globalError, 3);
      console.log('data', data);
    } catch (err) {
      console.log(err);
      hideLoading();
    }
  };

  return <div className="pachage-wrap"></div>;
};
