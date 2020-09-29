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
          // {
          //   path: '/daily',
          //   name: '日常作业情况',
          //   childRoutes: [
          //     {
          //       path: '/daily/transport-record',
          //       name: '清运记录',
          //       icon: 'MessageOutlined',
          //       component: lazy(() => import('@/pages/System/User')),
          //     },
          //   ],
          // },
          {
            path: '/info',
            name: '作业信息管理',
            childRoutes: [
              // {
              //   path: '/info/point-manage',
              //   name: '作业站点管理',
              //   icon: 'iconweizhi',
              //   childRoutes: [
              //     {
              //       path: '/info/point-manage/transport-shop',
              //       name: '清运店铺管理',
              //       component: lazy(() => import('@/pages/System/User')),
              //     },
              //   ],
              // },
              {
                path: '/info/service-object',
                name: '服务对象管理',
                icon: 'iconduixiangguanli',
                childRoutes: [
                  {
                    path: '/info/service-object/manage-shop',
                    name: '商铺管理',
                    component: lazy(
                      () => import('@/pages/Info/ServiceObject/ObjectShop')
                    ),
                  },
                  {
                    path: '/info/service-object/manage-shop-basic/:step', //新增、编辑
                    bread: false, //面包屑
                    hidden: true, //不在菜单栏显示
                    component: lazy(
                      () =>
                        import(
                          '@/pages/Info/ServiceObject/ObjectShop/Basic/Add'
                        )
                    ),
                  },
                  {
                    path: '/info/service-object/manage-address',
                    name: '地址库管理',
                    component: lazy(
                      () => import('@/pages/Info/ServiceObject/ManageAddress')
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: '/enterprise',
            name: '企业综合管理',
            childRoutes: [
              {
                path: '/enterprise/enterprise-charge',
                name: '收费管理',
                icon: 'iconshoufei',
                childRoutes: [
                  {
                    path: '/enterprise/enterprise-charge/contract',
                    name: '合同管理',
                    component: lazy(
                      () =>
                        import('@/pages/Enterprise/ChargeManage/ContractManage')
                    ),
                  },
                  {
                    path: '/enterprise/enterprise-charge/bill',
                    name: '账单管理',
                    component: lazy(
                      () => import('@/pages/Enterprise/ChargeManage/BillManage')
                    ),
                  },
                  {
                    path: '/enterprise/enterprise-charge/payment',
                    name: '缴费管理',
                    component: lazy(
                      () =>
                        import('@/pages/Enterprise/ChargeManage/PaymentManage')
                    ),
                  },
                ],
              },
            ],
          },
          // {
          //   path: '/welcome',
          //   name: '欢迎页',
          //   icon: 'MessageOutlined',
          //   childRoutes: [
          //     {
          //       path: '/welcome/index',
          //       name: '欢迎页',
          //       icon: 'MessageOutlined',
          //       component: lazy(() => import('@/pages/Home')),
          //     },
          //   ],
          // },
          // {
          //   path: '/home',
          //   name: 'home主页',
          //   icon: 'MessageOutlined',
          //   component: lazy(() => import('@/pages/Home')),
          // },
          // {
          //   path: '/system',
          //   name: '系统管理',
          //   icon: 'MessageOutlined',
          //   childRoutes: [
          //     {
          //       path: '/system/user',
          //       name: '用户配置',
          //       icon: 'MessageOutlined',
          //       component: lazy(() => import('@/pages/System/User')),
          //     },
          //     {
          //       path: '/system/star',
          //       name: '个人中心',
          //       icon: 'MessageOutlined',
          //       component: lazy(() => import('@/pages/System/Star')),
          //     },
          //   ],
          // },
          {
            path: '/',
            exact: true,
            redirect: '/info/service-object/manage-shop',
          },
          { path: '*', exact: true, redirect: '/exception/404' },
        ],
      },
    ],
  },
]

export default config
