/* eslint-disable import/extensions */
import React from 'react'
import { Layout, Dropdown, Menu, Row, Col } from 'antd'
import { SmileOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import Logo from '@/assets/images/header-logo.png'
import { appStores } from '@/stores'
import './style.scss'
import menus from '@/routers/config'

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
)

const MainHeader = () => {
  const firstMenu =
    menus[0].childRoutes[menus[0].childRoutes.length - 1].childRoutes?.filter(
      (n) => n.name && n.path
    ) || []
  const { globalStore } = appStores()

  return (
    <Layout.Header className="main-header">
      <Row style={{ paddingRight: 20 }}>
        <Col offset={1}>
          <Link to="/" className="main-logo">
            {/* <CarOutlined style={{ color: '#13e367' }} /> */}
            {!globalStore.collapsed && (
              // <span className="app-name">{globalStore.appTitle}</span>
              <img className="logo" src={Logo} />
            )}
          </Link>
        </Col>
        {/* <Col>
          {
            <div className="trigger" onClick={globalStore.toggleCollapsed}>
              {globalStore.collapsed ? (
                <MenuFoldOutlined />
              ) : (
                <MenuUnfoldOutlined />
              )}
            </div>
          }
        </Col> */}

        <Col flex={1}>
          <Row justify="end">
            {/* 一级菜单 */}
            <Menu
              className="menu-one"
              mode="horizontal"
              onClick={({ key }) => (globalStore.menuPath[0] = key)}
              defaultSelectedKeys={[globalStore.menuPath[0]]}
            >
              {firstMenu.map((n: any = {}) => (
                <Menu.Item key={n.path}>{n.name}</Menu.Item>
              ))}
            </Menu>
          </Row>
        </Col>
        <Col>
          <Dropdown
            overlay={menu}
            trigger={['click', 'hover']}
            placement="bottomCenter"
          >
            <div className="user-info">
              <span className="user-img" />
              <span className="user-name">
                {globalStore.userInfo.loginName}
              </span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default observer(MainHeader)
