// @ts-nocheck
import React, { useMemo, useState } from 'react'
import { Layout, Breadcrumb } from 'antd'
import { observer } from 'mobx-react'
import SiderMenu from '../SiderMenu'
import MainHeader from '../MainHeader'
import { appStores } from '@/stores'
// import MainFooter from "../MainFooter";

import './style.scss'

const BasicLayout = ({ route, children }) => {
  const { globalStore } = appStores()
  // console.log(route, children)
  return (
    <Layout className="main-layout">
      <MainHeader />
      <Layout>
        <SiderMenu routes={route.childRoutes} />
        {/* 左侧菜单导航 */}
        <Layout className="main-layout-right">
          {/* 面包屑 */}
          {globalStore.showBread && (
            <Breadcrumb>
              {globalStore.breads.map((name, i) => (
                <Breadcrumb.Item key={i}>{name}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
          <Layout.Content
            className="main-layout-content"
            style={{ paddingTop: globalStore.showBread ? '30px' : '0' }}
          >
            {children}
            {/* <MainFooter></MainFooter> */}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(BasicLayout)
