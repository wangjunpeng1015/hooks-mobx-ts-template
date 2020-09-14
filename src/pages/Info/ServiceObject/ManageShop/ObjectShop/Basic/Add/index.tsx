import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Tabs, Row, Col } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { renderComponent, splitUrl, Props } from '@/utils'
const { TabPane } = Tabs
const tabs = [
  {
    title: '基础信息',
    componentPath:
      'pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Basic.tsx',
  },
  {
    title: '企业信息',
    componentPath:
      '/pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Basic.tsx',
  },
  {
    title: '店铺图片',
    componentPath:
      '/pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Basic.tsx',
  },
  {
    title: '合同信息',
    componentPath:
      '/pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Basic.tsx',
  },
  {
    title: '账单信息',
    componentPath:
      '/pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Basic.tsx',
  },
  {
    title: '缴费信息',
    componentPath:
      '/pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Basic.tsx',
  },
]
const ManageShopAddStore = (props) => {
  const aa = useParams()
  const location = useLocation()
  debugger
  const [search, setSearch] = useState<Props>({ step: '' })
  useEffect(() => {
    const params = splitUrl(location.search)
    setSearch(params)
  }, [location])
  return (
    <div>
      <Row justify="space-between">
        <Col>商铺管理-{1}</Col>
        <Col>
          <CloseOutlined />
        </Col>
      </Row>
      <Tabs activeKey={String(search.step)}>
        {tabs.map((tab, index) => (
          <TabPane tab={tab.title} key={String(index)}>
            {renderComponent(tab)}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}
export default ManageShopAddStore
