import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  FormOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: '/form', icon: <FormOutlined />, label: <Link to="/form">提交报销</Link> },
  { key: '/my', icon: <ProfileOutlined />, label: <Link to="/my">我的报销</Link> },
  { key: '/approval', icon: <CheckCircleOutlined />, label: <Link to="/approval">审批管理</Link> },
  { key: '/archive', icon: <FileSearchOutlined />, label: <Link to="/archive">凭证归档查询</Link> },
];

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, background: '#fff', textAlign: 'center', lineHeight: '32px', fontWeight: 'bold' }}>
          {collapsed ? '报' : '报销系统'}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, fontWeight: 'bold', fontSize: 18, paddingLeft: 24 }}>
          建筑行业财务报销系统
        </Header>
        <Content style={{ margin: '24px 16px 0', background: '#fff', borderRadius: 8, minHeight: 360, padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
