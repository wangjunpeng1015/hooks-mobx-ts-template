/* eslint-disable import/extensions */
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Menu, Row } from 'antd';
import {
  CarOutlined,
} from '@ant-design/icons';
import { appStores } from '@/stores';
import './style.scss';

const renderMenuItem = (target: any) => {
  return target
    .filter((item: any) => item.path && item.name)
    .map((subMenu: any) => {
      if (subMenu.childRoutes && !!subMenu.childRoutes.find((child: any) => child.path && child.name)) {
        return (
          <Menu.SubMenu
            key={subMenu.path}
            title={
              <div>
                {subMenu.icon}
                <span>{subMenu.name}</span>
              </div>
            }
          >
            {renderMenuItem(subMenu.childRoutes)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={subMenu.path}>
          <Link to={subMenu.path}>
            <span>
              {subMenu.icon}
              <span>{subMenu.name}</span>
            </span>
          </Link>
        </Menu.Item>
      );
    });
};

const SiderMenu = ({ routes }) => {
  const { pathname } = useLocation();
  // console.log(pathname);
  const { globalStore } = appStores();
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const list = pathname.split('/').splice(1);
    setOpenKeys(list.map((_item: any, index: number) => `/${list.slice(0, index + 1).join('/')}`));
  }, []);

  const getSelectedKeys = useMemo(() => {
    console.log('getSelectedKeys');
    const list = pathname.split('/').splice(1);
    return list.map((_item: any, index: number) => `/${list.slice(0, index + 1).join('/')}`);
  }, [pathname]);

  const onOpenChange = (keys: React.SetStateAction<never[]>) => {
    setOpenKeys(keys);
  };

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={globalStore.collapsed}
      className="main-left-slider"
    >
      <Link to="/">
        <Row align="middle" className="main-logo">
          <CarOutlined style={{ color: '#13e367' }} />
          {!globalStore.collapsed && <span className="app-name">{globalStore.appTitle}</span>}
        </Row>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        style={{ paddingLeft: 0, marginBottom: 0 }}
        className="main-menu"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={getSelectedKeys}
      >
        {renderMenuItem(routes)}
      </Menu>
    </Layout.Sider>
  );
};

export default observer(SiderMenu);
