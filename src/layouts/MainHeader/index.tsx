/* eslint-disable import/extensions */
import React from 'react';
import { Layout, Dropdown, Menu, Row, Col } from 'antd';
import {
  SmileOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { appStores } from '@/stores';
import './style.scss';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <SmileOutlined type="smile" />
      个人信息
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link to="/login">
        <LogoutOutlined />
        &nbsp; 退出登录
      </Link>
    </Menu.Item>
  </Menu>
);

const MainHeader = () => {
  const { globalStore } = appStores();
  return (
    <Layout.Header className="main-header">
      <Row style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
          {
            <div className="trigger" onClick={globalStore.toggleCollapsed}>
              globalStore.collapsed?<MenuFoldOutlined />:<MenuUnfoldOutlined />
            </div>
          }
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
            <div className="user-info">
              <span className="user-img" />
              <span className="user-name">{globalStore.userInfo.loginName}</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default observer(MainHeader);
