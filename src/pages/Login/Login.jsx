
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useUser } from '../../store';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const onFinish = (values) => {
    // 模拟登录成功，存入全局Context
    const userInfo = {
      name: '张三',
      department: '工程部',
      role: 'user',
      jobNumber: values.jobNumber
    };
    setUser(userInfo);
    message.success('登录成功');
    navigate('/form');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <div style={{ width: 350, padding: 32, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>员工登录</h2>
        <Form name="login" onFinish={onFinish} autoComplete="off" layout="vertical">
          <Form.Item
            label="员工工号"
            name="jobNumber"
            rules={[{ required: true, message: '请输入员工工号' }]}
          >
            <Input placeholder="请输入工号" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度不能少于6位' }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
