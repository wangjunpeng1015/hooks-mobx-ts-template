/* eslint-disable import/extensions */
// @ts-nocheck
import React, { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Layout, Menu, Row } from 'antd'
import { iconBC } from '@/utils'
import { appStores } from '@/stores'
import './style.scss'

const renderMenuItem = (target: any) => {
  return target
    .filter((item: any) => item.path && item.name && !item.hidden)
    .map((subMenu: any) => {
      if (
        subMenu.childRoutes &&
        !!subMenu.childRoutes.find((child: any) => child.path && child.name)
      ) {
        return (
          <Menu.SubMenu
            key={subMenu.path}
            icon={iconBC(subMenu.icon)}
            title={subMenu.name}
          >
            {renderMenuItem(subMenu.childRoutes)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={subMenu.path} icon={iconBC(subMenu.icon)}>
          <Link to={subMenu.path}>
            <span>{subMenu.name}</span>
          </Link>
        </Menu.Item>
      )
    })
}

const SiderMenu = ({ routes }) => {
  const { pathname } = useLocation()
  // console.log(pathname);
  const { globalStore } = appStores()
  const [openKeys, setOpenKeys] = useState([])

  useEffect(() => {
    const list = pathname.split('/').splice(1)
    setOpenKeys(
      list.map(
        (_item: any, index: number) => `/${list.slice(0, index + 1).join('/')}`
      )
    )
  }, [])

  const breadcrumb = (pages, path, isLast) => {
    if (Array.isArray(pages) && typeof path === 'string') {
      const page = pages.find((n) => {
        //如果有参数去掉
        let url = n.path
        if (url.includes(':')) {
          url = url.split(':')[0]
          url = url.substring(0, url.length - 1)
        }
        const sortPath = url.split('/').pop()
        return sortPath === path
      })
      if (page) {
        if (isLast) {
          globalStore.showBread = page.bread ?? true
        }
        return page.name
      } else {
        const menu = pages.map((n) => {
          return breadcrumb(n.childRoutes, path, isLast)
        })
        return new Set(menu)
      }
    }
  }

  const getSelectedKeys = useMemo(() => {
    const list = pathname.split('/').splice(1).slice(0, 3)
    globalStore.breads = list.map((path, index) =>
      breadcrumb(routes, path, index === list.length - 1)
    )
    return list.map(
      (_item: any, index: number) => `/${list.slice(0, index + 1).join('/')}`
    )
  }, [pathname])

  const onOpenChange = (keys: React.SetStateAction<never[]>) => {
    setOpenKeys(keys)
  }
  const route =
    routes.find((n) => n.path === globalStore.menuPath[0])?.childRoutes || []
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={globalStore.collapsed}
      className="main-left-slider"
    >
      <Menu
        mode="inline"
        theme="dark"
        style={{ paddingLeft: 0, marginBottom: 0 }}
        className="main-menu"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={getSelectedKeys}
      >
        {renderMenuItem(route)}
      </Menu>
    </Layout.Sider>
  )
}

export default observer(SiderMenu)
