import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Tabs, Row, Col } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { renderComponent } from '@/utils'
import './index.scss'
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
      'pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Enterprise.tsx',
  },
  {
    title: '店铺图片',
    componentPath:
      'pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Picture.tsx',
  },
  {
    title: '合同信息',
    componentPath:
      'pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Contract.tsx',
  },
  {
    title: '账单信息',
    componentPath:
      'pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Bill.tsx',
  },
  {
    title: '缴费信息',
    componentPath:
      'pages/Info/ServiceObject/ManageShop/ObjectShop/Basic/Add/Payment.tsx',
  },
]

const ManageShopAddStore = (props: any) => {
  const history = useHistory()
  const { step } = useParams()
  const { data = {} } = props.location //合同参数

  const goto = (step: string) => {
    history.replace(`/info/service-object/manage-shop-basic/${step}`)
  }

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <h1>商铺管理-{data.id ? '编辑' : '添加'}</h1>
        </Col>
        <Col>
          <CloseOutlined
            onClick={() => history.push('/info/service-object/manage-shop')}
          />
        </Col>
      </Row>
      <Tabs activeKey={String(step)} onChange={(val) => goto(val)}>
        {tabs.map((tab, index) => {
          return (
            <TabPane tab={tab.title} key={String(index)}>
              <div style={{ width: '50%' }}>
                {renderComponent(tab, { data })}
                {/* <Row gutter={16} justify="end">
                <Col>
                  <Button type="primary">上一步</Button>
                </Col>
                <Col>
                  <Button type="primary">下一步</Button>
                </Col>
              </Row> */}
              </div>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}
export default ManageShopAddStore
