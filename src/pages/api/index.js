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
  const [apiInfo, setApiInfo] = useState({});
  const [totalSize, setTotalSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState('修改');
  const [dict, setDict] = useState({});
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
          <a onClick={() => handleEdit(record.id)}>修改</a>
          <a
            onClick={() =>
              Modal.confirm({
                okText: '确定',
                cancelText: '取消',
                content: '确定删除吗？',
                onOk: () => handleDelete(record.apiCode),
              })
            }
          >
            删除
          </a>
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
      setDataSource(data.content.map(v => ({key: v.id, ...v})));
      setTotalSize(data.numberOfElements);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getApiInfoAjax = async params => {
    setLoading(true);
    try {
      const res = await Service.getApiInfo(params);
      const {data, success, globalError} = res;
      setLoading(false);
      if (!success) return message.error(globalError, 3);
      setApiInfo(data);
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

  const handleDelete = async apiCode => {
    setLoading(true);
    try {
      const res = await Service.delApiInfo({apiCode});
      const {data, success, globalError} = res;
      setLoading(false);
      if (!success) return message.error(globalError, 3);
      getDataSourceAjax({pageNumber: 1, pageSize});
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    setModalType('新增');
    setApiInfo({});
    const dictRes = await getDictAjax({});
    if (dictRes) {
      setDict(dictRes);
      setModalShow(true);
    }
  };

  const handleEdit = async id => {
    setModalType('修改');
    const current = dataSource?.find(v => v.id === id);
    await getApiInfoAjax({apiCode: current.apiCode});
    const dictRes = await getDictAjax({apiCode: current.apiCode});
    if (dictRes) {
      setDict(dictRes);
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
          <Col className="gutter-row" span={1}>
            <Button type="primary" onClick={handleAdd}>
              新增
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
          dict={dict}
          info={apiInfo}
          modalType={modalType}
        />
      )}
    </div>
  );
};
