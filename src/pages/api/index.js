import React, {useEffect, useState, useContext} from 'react';
import {history} from 'umi';
import Service from './service';
import useGlobalLoading from '@/common/utils/hooks/useGlobalLoading';
import {
  message,
  Modal,
  Table,
  Space,
  Row,
  Col,
  Input,
  Button,
  Form,
} from 'antd';
import ModalWrap from './components/modalWrap';
import './index.less';

export default () => {
  const {showLoading, hideLoading} = useGlobalLoading();
  const [dataSource, setDataSource] = useState([]);
  const [totalSize, setTotalSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [dict, setDict] = useState([]);
  const [form] = Form.useForm();
  const pageSize = 10;
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      sorter: (a, b) => b.id - a.id,
      key: 'id',
    },
    {
      title: '接口代码',
      dataIndex: 'apiCode',
      key: 'apiCode',
    },
    {
      title: '接口名称',
      dataIndex: 'apiName',
      key: 'apiName',
    },
    {
      title: '接口输出类型',
      dataIndex: 'resultType',
      key: 'resultType',
    },
    {
      title: '是否通知',
      dataIndex: 'toSend',
      key: 'toSend',
      render: r => <>{r === 0 ? '否' : '是'}</>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={handleAdd}>新增</a>
          <a onClick={() => handleEdit(record.id)}>修改</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getDataSourceAjax({pageNumber: 1, pageSize});
  }, []);

  const getDataSourceAjax = async params => {
    setLoading(true);
    try {
      const res = await Service.getApiInfoList(params);
      const {data, success, globalError} = res;
      setLoading(false);
      if (!success) return message.error(globalError, 3);
      console.log('data', data);
      setDataSource(data.content.map(v => ({key: v.id, ...v})));
      setTotalSize(data.numberOfElements);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getDictAjax = async params => {
    try {
      const res = await Service.getDict(params);
      const {data, success, globalError} = res;
      if (!success) return message.error(globalError, 3);
      return Promise.resolve(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = () => {
    setModalShow(true);
  };

  const handleEdit = async id => {
    const current = dataSource?.find(v => v.id === id);
    const dict = await getDictAjax({apiCode: current.apiCode});
    if (dict) {
      setModalInfo({...current, dict});
      setModalShow(true);
    }
  };

  const handleTableChange = e => {
    console.log('e', e);
  };

  const onFinish = async r => {
    const {apiCode, apiName} = r;
    getDataSourceAjax({pageNumber: 1, pageSize, apiCode, apiName});
  };

  return (
    <div className="api-wrap">
      <Form form={form} name="advanced_search" onFinish={onFinish}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Form.Item label="接口代码" name="apiCode">
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item label="接口名称" name="apiName">
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={1}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
          <Col className="gutter-row" span={1}>
            <Button
              type="primary"
              onClick={() => {
                form.resetFields();
                getDataSourceAjax({pageNumber: 1, pageSize});
              }}
            >
              重置
            </Button>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{total: totalSize}}
        loading={loading}
        onChange={handleTableChange}
      />
      {modalShow && (
        <ModalWrap
          visible={modalShow}
          setModalShow={setModalShow}
          getDataSourceAjax={getDataSourceAjax}
          data={modalInfo}
        />
      )}
    </div>
  );
};
