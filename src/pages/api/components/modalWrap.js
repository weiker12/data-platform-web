import React, {useState} from 'react';
import Service from '../service';
import {
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
} from 'antd';
import '../index.less';

export default props => {
  console.log('props', props);
  const {
    visible,
    dict,
    info,
    setModalShow,
    getDataSourceAjax,
    modalType,
  } = props;
  const {api_fields, dsCodes, result_type, send, status: statusDict} = dict;
  const {
    apiCode,
    apiName,
    dataConvertList,
    dataFlowList,
    dsCode,
    id,
    querySql,
    resultType,
    status,
    toSend,
  } = info;

  const [localDataFlowList, setLocalDataFlowList] = useState(
    () => dataFlowList || [],
  );

  const [localDataConvertList, setLocalDataConvertList] = useState(
    () => dataConvertList || [],
  );

  const [local_api_fields, setLocal_api_fields] = useState(
    () => api_fields || [],
  );

  const [isSlice, setIsSlice] = useState(() => (querySql ? 0 : 1));

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setModalShow(false);
  };

  const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
  };

  const validateMessages = {
    required: '${label}必填!',
    types: {
      number: '${label}不是一个合法的数字!',
    },
    number: {
      range: '${label}必须在${min}和${max}之间',
    },
  };

  const saveAjax = async params => {
    setConfirmLoading(true);
    try {
      const res = await Service.saveApiInfo(params);
      const {data, success, globalError} = res;
      setConfirmLoading(false);
      if (!success) return message.error(globalError, 3);
      message.success('保存成功', 2);
      setModalShow(false);
      // 更新数据
      getDataSourceAjax();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFlow = id => {
    setLocalDataFlowList(pre => pre.filter(v => v.id !== id));
  };

  const handleAddFlow = () => {
    setLocalDataFlowList(pre => [...pre, {id: Date.now()}]);
  };

  const handleDeleteField = id => {
    setLocalDataConvertList(pre => pre.filter(v => v.id !== id));
  };

  const handleAddField = () => {
    setLocalDataConvertList(pre => [...pre, {id: Date.now()}]);
  };

  const handleSliceChange = v => {};

  const onFinish = res => {
    console.log('res', res);
    const {dataConvertList, dataFlowList} = res;
    const {apiFieldName, convertScript} = dataConvertList;
    const newDataConvertList = Object.keys(apiFieldName).map(v => ({
      apiFieldName: apiFieldName[v],
      convertScript: convertScript[v],
    }));
    const newDataFlowList = Object.keys(dataFlowList).map(v => ({
      querySql: dataFlowList[v],
    }));
    saveAjax({
      id,
      ...res,
      dataConvertList: newDataConvertList,
      dataFlowList: newDataFlowList,
    });
  };

  return (
    <Modal
      title={name}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText="取消"
      okText="确认"
      width={800}
    >
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Row gutter={16}>
          <Col span="12">
            <Form.Item
              name="apiCode"
              label="接口代码"
              // rules={[{required: true}]}
              initialValue={apiCode || ''}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name="dsCode"
              label="数据源代码"
              rules={[{required: true}]}
              initialValue={dsCode || ''}
            >
              <Select>
                {dsCodes?.map((v, i) => (
                  <Select.Option value={i} key={i}>
                    {v}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="12">
            <Form.Item
              name="apiName"
              label="接口名称"
              // rules={[{required: true}]}
              initialValue={apiName || ''}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name="status"
              label="状态"
              rules={[{required: true}]}
              initialValue={status || ''}
            >
              <Select>
                {statusDict?.map(v => (
                  <Select.Option value={v.code} key={v.code}>
                    {v.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="12">
            <Form.Item
              name="resultType"
              label="接口输出类型"
              rules={[{required: true}]}
              initialValue={resultType || ''}
            >
              <Select>
                {result_type?.map(v => (
                  <Select.Option value={v.code} key={v.code}>
                    {v.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="12">
            <Form.Item
              name="toSend"
              label="是否通知"
              rules={[{required: true}]}
              initialValue={toSend || ''}
            >
              <Select>
                <Select.Option value={1}>是</Select.Option>
                <Select.Option value={0}>否</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name="isSlice"
              label="是否分片"
              rules={[{required: true}]}
              initialValue={isSlice}
            >
              <Select onChange={b => setIsSlice(b)}>
                <Select.Option value={1}>分片</Select.Option>
                <Select.Option value={0}>不分片</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {isSlice === 0 && (
          <Row gutter={16}>
            <Col span="24">
              <Form.Item
                name="querySql"
                label="报表SQL"
                rules={[{required: true}]}
                initialValue={querySql || ''}
                labelCol={{span: 3}}
                wrapperCol={{span: 19}}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        )}
        {isSlice === 1 && (
          <Row gutter={16}>
            <Col span="24">
              <Form.Item
                // name="dataFlowList"
                label="分片SQL"
                rules={[{required: true}]}
                // initialValue={name}
                labelCol={{span: 3}}
                wrapperCol={{span: 19}}
              >
                {modalType === '新增' && (
                  <Form.Item
                    name={['dataFlowList', `${Date.now()}`]}
                    label="全集"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 20}}
                  >
                    <Input />
                  </Form.Item>
                )}
                {localDataFlowList?.map(v => (
                  <Row gutter={16} key={v.id}>
                    <Col span="19">
                      <Form.Item
                        name={['dataFlowList', `${v.id}`]}
                        label={v.collectionType === 'all' ? '全集' : '子集'}
                        initialValue={v.querySql}
                        labelCol={{span: 2}}
                        wrapperCol={{span: 20}}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {v.collectionType !== 'all' && (
                      <Col span="4">
                        <Button
                          type="primary"
                          onClick={() => handleDeleteFlow(v.id)}
                        >
                          删除
                        </Button>
                      </Col>
                    )}
                  </Row>
                ))}
                <Button type="primary" onClick={handleAddFlow}>
                  新增
                </Button>
              </Form.Item>
            </Col>
          </Row>
        )}
        {modalType === '新增' && (
          <Button
            type="primary"
            style={{width: '100%', margin: '5px 0 20px 0'}}
          >
            查询字典
          </Button>
        )}
        {api_fields?.length > 0 && (
          <Row gutter={16}>
            <Col span="24">
              <Form.Item
                // name="dataConvertList"
                label="报表字段处理"
                rules={[{required: true}]}
                labelCol={{span: 3}}
                wrapperCol={{span: 19}}
              >
                {localDataConvertList?.map((v, i) => (
                  <Row gutter={16} key={v.id}>
                    <Col span="8">
                      <Form.Item
                        name={['dataConvertList', `apiFieldName`, `${v.id}`]}
                        label="字段名"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        initialValue={v.apiFieldName || ''}
                      >
                        <Select>
                          {local_api_fields?.map(l => (
                            <Select.Option value={l} key={l}>
                              {l}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span="11">
                      <Form.Item
                        name={['dataConvertList', `convertScript`, `${v.id}`]}
                        label="字段脚本"
                        initialValue={v.convertScript || ''}
                        labelCol={{span: 6}}
                        wrapperCol={{span: 20}}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span="3">
                      <Button
                        type="primary"
                        onClick={() => handleDeleteField(v.id)}
                      >
                        删除
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button type="primary" onClick={handleAddField}>
                  新增
                </Button>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};
