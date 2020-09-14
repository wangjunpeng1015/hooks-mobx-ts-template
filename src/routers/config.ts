/* eslint-disable import/extensions */
import { lazy } from 'react'

import BasicLayout from '@/layouts/BasicLayout'
import BlankLayout from '@/layouts/BlankLayout'

const config = [
  {
    path: '/',
    component: BlankLayout, // 空白页布局
    childRoutes: [
      {
        path: '/login', // 路由路径
        name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
        icon: 'MessageOutlined', // 菜单图标
        component: lazy(() => import('@/pages/Login')), // 懒加载 路由组件
      },
      // 子菜单路由
      {
        path: '/',
        // exact: true,
        component: BasicLayout, // 基本布局
        childRoutes: [
          {
            path: '/daily',
            name: '日常作业情况',
            icon: 'MessageOutlined',
            childRoutes: [
              {
                path: '/daily/transport-record',
                name: '清运记录',
                icon: 'MessageOutlined',
                component: lazy(() => import('@/pages/System/User')),
              },
            ],
          },
          {
            path: '/info',
            name: '作业信息管理',
            icon: 'MessageOutlined',
            childRoutes: [
              {
                path: '/info/point-manage',
                name: '作业点管理',
                icon: 'MessageOutlined',
                childRoutes: [
                  {
                    path: '/info/point-manage/transport-shop',
                    name: '清运店铺管理',
                    icon: 'MessageOutlined',
                    component: lazy(() => import('@/pages/System/User')),
                  },
                ],
              },
              {
                path: '/info/service-object',
                name: '服务对象管理',
                icon: 'MessageOutlined',
                childRoutes: [
                  {
                    path: '/info/service-object/manage-shop',
                    name: '商铺管理',
                    icon: 'MessageOutlined',
                    component: lazy(
                      () =>
                        import(
                          '@/pages/Info/ServiceObject/ManageShop/ObjectShop'
                        )
                    ),
                  },
                  {
                    path: '/info/service-object/manage-shop-basic', //新增、编辑
                    bread: false,
                    hidden: true,
                    component: lazy(
                      () =>
                        import(
                          '@/pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add'
                        )
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: '/welcome',
            name: '欢迎页',
            icon: 'MessageOutlined',
            childRoutes: [
              {
                path: '/welcome/index',
                name: '欢迎页',
                icon: 'MessageOutlined',
                component: lazy(() => import('@/pages/Home')),
              },
            ],
          },
          {
            path: '/home',
            name: 'home主页',
            icon: 'MessageOutlined',
            component: lazy(() => import('@/pages/Home')),
          },
          {
            path: '/formDemo',
            name: '表单演示',
            icon: 'MessageOutlined',
            component: lazy(() => import('@/pages/FormDemo')),
          },
          {
            path: '/system',
            name: '系统管理',
            icon: 'MessageOutlined',
            childRoutes: [
              {
                path: '/system/user',
                name: '用户配置',
                icon: 'MessageOutlined',
                component: lazy(() => import('@/pages/System/User')),
              },
              {
                path: '/system/star',
                name: '个人中心',
                icon: 'MessageOutlined',
                component: lazy(() => import('@/pages/System/Star')),
              },
            ],
          },
          {
            path: '/exception',
            name: '异常页',
            // exact: true,
            icon: 'MessageOutlined',
            childRoutes: [
              {
                path: '/exception/403',
                name: '403',
                icon: 'MessageOutlined',
                component: lazy(() => import('@/pages/Exception/403')),
              },
              {
                path: '/exception/404',
                name: '404',
                exact: true,
                icon: 'MessageOutlined',
                component: lazy(() => import('@/pages/Exception/404')),
              },
              {
                path: '/exception/500',
                name: '500',
                icon: 'MessageOutlined',
                component: lazy(() => import('@/pages/Exception/500')),
              },
            ],
          },
          { path: '/', exact: true, redirect: '/welcome' },
          { path: '*', exact: true, redirect: '/exception/404' },
        ],
      },
    ],
  },
]

export default config
