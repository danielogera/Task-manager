import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/calendar',
      icon: <CalendarOutlined />,
      label: <Link to="/calendar">Calendar</Link>,
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: <Link to="/analytics">Analytics</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        className="shadow-sm fixed left-0 top-0 bottom-0 z-10 transition-all duration-300 ease-in-out lg:relative"
        width={250}
        collapsible
        collapsed={collapsed}
        trigger={null}
        breakpoint="lg"
        onBreakpoint={setCollapsed}
      >
        <div className={`p-4 text-xl font-bold text-center border-b transition-all duration-300 ${collapsed ? 'text-sm' : ''}`}>
          {collapsed ? 'TM' : 'Task Manager'}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-r-0 pt-4"
        />
      </Sider>
      <Layout className={`transition-all duration-300 ${collapsed ? 'ml-[80px]' : 'ml-[250px]'} lg:ml-0`}>
        <Header className="bg-white px-4 lg:px-6 flex items-center justify-between shadow-sm sticky top-0 z-[5]">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center"
            />
            <h1 className="text-lg font-semibold m-0 hidden sm:block">
              {menuItems.find(item => item.key === location.pathname)?.label}
            </h1>
          </div>
        </Header>
        <Content className="p-4 lg:p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm min-h-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 