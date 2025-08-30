
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, message } from 'antd';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    // 模拟登录请求
    setTimeout(() => {
      setLoading(false);
      if (values.username === 'admin' && values.password === '123456') {
        message.success('登录成功！');
        setTimeout(() => {
          navigate('/form');
        }, 500);
      } else {
        message.error('用户名或密码错误');
      }
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <div style={{ padding: 32, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>系统登录</h2>
        <Form name="login" onFinish={onFinish} autoComplete="off">
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}> 
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}> 
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
