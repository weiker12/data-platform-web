import React from 'react';
import {useContext, useState} from 'react';
import {Form, Input, Button, message, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import Service from './service';
import {history} from 'umi';
import GlobalContext from '@/common/utils/context/globalContext';
import useGlobalLoading from '@/common/utils/hooks/useGlobalLoading';

export interface Store {
  [key: string]: any;
}

export default () => {
  const {login} = Service;
  const {dispatch} = useContext(GlobalContext);
  const {showLoading, hideLoading} = useGlobalLoading();
  const [count, setCount] = useState(60);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [form] = Form.useForm();

  const loginAjax = async (values: {cellphone: string; smsCode: string}) => {
    const {cellphone, smsCode} = values;
    showLoading();
    try {
      const res = await login({cellphone, smsCode});
      const {data, success, globalError} = res;
      hideLoading();
      if (!success) return message.error(globalError, 3);
      message.success('登录成功', 3);
      dispatch({
        type: 'login',
        payload: {name: cellphone},
      });
      window.sessionStorage.setItem('jwtToken', data);
      window.sessionStorage.setItem(
        'userInfo',
        JSON.stringify({cellphone: cellphone}),
      );
      history.push('admin/sql');
    } catch (err) {
      console.log(err);
      hideLoading();
    }
  };

  const onFinish = (values: Store) => {
    const {cellphone, smsCode} = values;
    loginAjax({cellphone, smsCode});
  };

  const sendVrCode = async () => {
    const cellphone = form.getFieldValue('cellphone');
    if (cellphone?.length !== 11) return message.error('手机号不合法！', 1);
    setButtonLoading(true);
    try {
      const res = await Service.sendVrCode({cellphone: cellphone});
      const {success, globalError} = res;
      setButtonLoading(false);
      if (!success) return message.error(globalError, 3);
      setCount(pre => pre - 1);
      const countInterval = setInterval(() => {
        setCount(pre => {
          if (pre === 0) {
            clearInterval(countInterval);
            return 60;
          }
          return pre - 1;
        });
      }, 1000);
    } catch (err) {
      console.log(err);
      setButtonLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="cellphone"
        rules={[
          {required: true, message: '请输入手机号!'},
          {len: 11, message: '手机号不合法!'},
        ]}
      >
        <Input
          // prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="请输入手机号"
          type="tel"
          maxLength={11}
        />
      </Form.Item>
      <Form.Item>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="smsCode"
              noStyle
              rules={[{required: true, message: '请输入验证码！'}]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button
              onClick={sendVrCode}
              loading={buttonLoading}
              disabled={count !== 60 || buttonLoading}
            >
              {count !== 60 ? count : buttonLoading ? '' : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
