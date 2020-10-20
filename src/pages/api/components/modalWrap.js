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
} from 'antd';
import '../index.less';

export default props => {
  console.log('props', props);
  const {visible, data, setModalShow, getDataSourceAjax} = props;
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

  // const save = async params => {
  //   setConfirmLoading(true);
  //   try {
  //     const res = await Service.saveCourse(params);
  //     const {data, success, globalError} = res;
  //     setConfirmLoading(false);
  //     if (!success) return message.error(globalError, 3);
  //     message.success('保存成功', 2);
  //     setModalShow(false);
  //     // 更新数据
  //     getPackage();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onFinish = res => {
    console.log('res', res);
    save({
      ...data,
      ...res.course,
    });
  };

  // const {
  //   id,
  //   fakeLimit,
  //   fakeSales,
  //   name,
  //   title,
  //   payPrice,
  //   status,
  //   totalPrice,
  //   type,
  // } = data;

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
              name={['course', 'name']}
              label="课程名称"
              // rules={[{required: true}]}
              // initialValue={name}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name={['course', 'type']}
              label="课程类型"
              rules={[{required: true}]}
            >
              <Select>
                <Select.Option value="0">体验课</Select.Option>
                <Select.Option value="1">系统课</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="12">
            <Form.Item
              name={['course', 'name']}
              label="课程名称"
              // rules={[{required: true}]}
              // initialValue={name}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name={['course', 'type']}
              label="课程类型"
              rules={[{required: true}]}
            >
              <Select>
                <Select.Option value="0">体验课</Select.Option>
                <Select.Option value="1">系统课</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="12">
            <Form.Item
              name={['course', 'name']}
              label="课程名称"
              // rules={[{required: true}]}
              // initialValue={name}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name={['course', 'type']}
              label="课程类型"
              rules={[{required: true}]}
            >
              <Select>
                <Select.Option value="0">体验课</Select.Option>
                <Select.Option value="1">系统课</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="12">
            <Form.Item
              name={['course', 'type']}
              label="课程类型"
              rules={[{required: true}]}
            >
              <Select>
                <Select.Option value="0">体验课</Select.Option>
                <Select.Option value="1">系统课</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              name={['course', 'type']}
              label="课程类型"
              rules={[{required: true}]}
            >
              <Select>
                <Select.Option value="0">体验课</Select.Option>
                <Select.Option value="1">系统课</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="24">
            <Form.Item
              name={['course', 'name']}
              label="课程名称"
              rules={[{required: true}]}
              // initialValue={name}
              labelCol={{span: 3}}
              wrapperCol={{span: 19}}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="24">
            <Form.Item
              name={['course', 'name']}
              label="课程名称"
              rules={[{required: true}]}
              // initialValue={name}
              labelCol={{span: 3}}
              wrapperCol={{span: 19}}
            >
              <Form.Item
                name={['course', 'name']}
                label="全集SPL"
                // initialValue={name}
                labelCol={{span: 3}}
                wrapperCol={{span: 21}}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['course', 'name']}
                label="全集SPL"
                // initialValue={name}
                labelCol={{span: 3}}
                wrapperCol={{span: 21}}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['course', 'name']}
                label="全集SPL"
                // initialValue={name}
                labelCol={{span: 3}}
                wrapperCol={{span: 21}}
              >
                <Input />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span="24">
            <Form.Item
              name={['course', 'name']}
              label="报表字段处理"
              rules={[{required: true}]}
              // initialValue={name}
              labelCol={{span: 3}}
              wrapperCol={{span: 19}}
            >
              <Row gutter={16}>
                <Col span="10">
                  <Form.Item
                    name={['course', 'type']}
                    label="字段名"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                  >
                    <Select>
                      <Select.Option value="0">体验课</Select.Option>
                      <Select.Option value="1">系统课</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span="14">
                  <Form.Item
                    name={['course', 'name']}
                    label="字段脚本"
                    // initialValue={name}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 20}}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span="10">
                  <Form.Item
                    name={['course', 'type']}
                    label="字段名"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                  >
                    <Select>
                      <Select.Option value="0">体验课</Select.Option>
                      <Select.Option value="1">系统课</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span="14">
                  <Form.Item
                    name={['course', 'name']}
                    label="字段脚本"
                    // initialValue={name}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 20}}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span="10">
                  <Form.Item
                    name={['course', 'type']}
                    label="字段名"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                  >
                    <Select>
                      <Select.Option value="0">体验课</Select.Option>
                      <Select.Option value="1">系统课</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span="14">
                  <Form.Item
                    name={['course', 'name']}
                    label="字段脚本"
                    // initialValue={name}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 20}}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
