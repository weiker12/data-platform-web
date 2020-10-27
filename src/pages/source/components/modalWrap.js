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
  const {visible, info, setModalShow, getDataSourceListAjax} = props;

  const {dsCode, username, password, url, status, id} = info;

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
      const res = await Service.saveDataSource(params);
      const {data, success, globalError} = res;
      setConfirmLoading(false);
      if (!success) return message.error(globalError, 3);
      message.success('保存成功', 2);
      setModalShow(false);
      // 更新数据
      getDataSourceListAjax();
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = res => {
    console.log('res', res);
    saveAjax({
      id,
      ...res,
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
        <Form.Item
          name="dsCode"
          label="数据源代码"
          initialValue={dsCode || ''}
          labelCol={{span: 6}}
          wrapperCol={{span: 20}}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="用户名"
          initialValue={username || ''}
          labelCol={{span: 6}}
          wrapperCol={{span: 20}}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          initialValue={password || ''}
          labelCol={{span: 6}}
          wrapperCol={{span: 20}}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
          rules={[{required: true}]}
          initialValue={status || ''}
        >
          <Select>
            <Select.Option value={1}>有效</Select.Option>
            <Select.Option value={0}>无效</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="url"
          label="数据连接信息"
          initialValue={url || ''}
          labelCol={{span: 6}}
          wrapperCol={{span: 20}}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
