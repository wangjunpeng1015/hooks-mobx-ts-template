// @ts-nocheck
import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import SiderMenu from '../SiderMenu'
import MainHeader from '../MainHeader'
// import MainFooter from "../MainFooter";

import './style.scss'

const BasicLayout = ({ route, children }) => {
  // console.log(route, children);
  return (
    <Layout className="main-layout">
      <MainHeader />
      <Layout>
        <SiderMenu routes={route.childRoutes} />
        {/* 左侧菜单导航 */}
        <Layout className="main-layout-right">
          {/* 面包屑 */}
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout.Content className="main-layout-content">
            {children}
            {/* <MainFooter></MainFooter> */}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
