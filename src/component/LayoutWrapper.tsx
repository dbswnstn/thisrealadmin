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
import { useRouter, usePathname } from 'next/navigation'; 

import { unstableSetRender } from 'antd'
import { createRoot } from 'react-dom/client'

// ✅ React 19 호환용 antd 설정 (최상단에서 한 번만 실행)
unstableSetRender((node, container) => {
  //@ts-ignore
  container._reactRoot ||= createRoot(container)
  //@ts-ignore
  const root = container._reactRoot
  root.render(node)
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    root.unmount()
  }
})

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  // const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); 

  const items = [
    { key: '/', icon: <PieChartOutlined />, label: '현황' },
    { key: '/match', icon: <DesktopOutlined />, label: '매칭 관리' },   
    {
      key: '/user',
      icon: <UserOutlined />,
      label: '유저 관리',
      children: [
        { key: '/user/imageLabeling', label: '프로필 이미지 라벨링' },
        { key: '/user/identificationCheck', label: '신원 인증 심사' },
      ],
    }
 
 /*
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
     */
  ];

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key); // 클릭한 메뉴 key를 URL로 사용
  };


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
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={['/user']}
          items={items} 
          onClick={handleMenuClick}
          />
      </Sider>
      <Layout>
        {/*
        <Header style={{ padding: 0, backgroundColor: '#fff' }} />
         */}
        <Content style={{ margin: '16px 16px' }}>
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