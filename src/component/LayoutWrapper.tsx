'use client';

import { Layout, Breadcrumb, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { useState } from 'react';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons';



export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  // const [collapsed, setCollapsed] = useState(false);

  const items = [
    { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
    { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
    {
      key: 'sub1',
      icon: <UserOutlined />,
      label: 'User',

      children: [
        { key: '3', label: 'Tom' },
        { key: '4', label: 'Bill' },
        { key: '5', label: 'Alex' },
      ],
    },
    {
      key: 'sub2',
      icon: <TeamOutlined />,
      label: 'Team',
      children: [
        { key: '6', label: 'Team 1' },
        { key: '8', label: 'Team 2' },
      ],
    },
    { key: '9', icon: <FileOutlined />, label: 'File' },
  ];


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2']}
          items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, backgroundColor: '#fff' }} />
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]} separator=">" />  */}
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2025 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}