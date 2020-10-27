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
  const [dataSourceList, setDataSourceList] = useState([]);
  const [dataSourceItem, setDataSourceItem] = useState({});
  const [totalSize, setTotalSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
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
      title: '数据源代码',
      dataIndex: 'dsCode',
      key: 'dsCode',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '数据库连接信息',
      dataIndex: 'url',
      key: 'url',
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
                onOk: () => handleDelete(record.id),
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
    getDataSourceListAjax({pageNumber: 1, pageSize});
  }, []);

  const getDataSourceListAjax = async params => {
    setLoading(true);
    try {
      const res = await Service.getDataSourceList(params);
      const {data, success, globalError} = res;
      setLoading(false);
      if (!success) return message.error(globalError, 3);
      setDataSourceList(data.content.map(v => ({key: v.id, ...v})));
      setTotalSize(data.numberOfElements);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getDataSourceAjax = async params => {
    setLoading(true);
    try {
      const res = await Service.getDataSource(params);
      const {data, success, globalError} = res;
      setLoading(false);
      if (!success) return message.error(globalError, 3);
      setDataSourceItem(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    setLoading(true);
    try {
      const res = await Service.delDataSource({id});
      const {data, success, globalError} = res;
      setLoading(false);
      if (!success) return message.error(globalError, 3);
      message.success('删除成功', 2);
      getDataSourceListAjax({pageNumber: 1, pageSize});
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setDataSourceItem({});
    setModalShow(true);
  };

  const handleEdit = async id => {
    await getDataSourceAjax({id});
    setModalShow(true);
  };

  const handleTableChange = e => {
    console.log('e', e);
  };

  const onFinish = async r => {
    const {dsCode} = r;
    getDataSourceListAjax({pageNumber: 1, pageSize, dsCode});
  };

  return (
    <div className="api-wrap">
      <Form form={form} name="advanced_search" onFinish={onFinish}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Form.Item label="数据源代码" name="dsCode">
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
                getDataSourceListAjax({pageNumber: 1, pageSize});
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
        dataSource={dataSourceList}
        pagination={{total: totalSize}}
        loading={loading}
        onChange={handleTableChange}
      />
      {modalShow && (
        <ModalWrap
          visible={modalShow}
          setModalShow={setModalShow}
          getDataSourceListAjax={getDataSourceListAjax}
          info={dataSourceItem}
        />
      )}
    </div>
  );
};
