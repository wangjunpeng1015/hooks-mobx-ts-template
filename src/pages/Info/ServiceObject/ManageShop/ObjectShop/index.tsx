import React from 'react'
import Basic from './Basic/Basic'
import Contract from './Contract/Contract'
import { Tabs } from 'antd'
import './index.scss'
const { TabPane } = Tabs

const ObjectShop = () => {
  const callback = () => {}
  return (
    <>
      <Tabs defaultActiveKey="basic" onChange={() => callback}>
        <TabPane tab="基础信息" key="basic">
          <Basic />
        </TabPane>
        <TabPane tab="合同信息" key="contract">
          <Contract />
        </TabPane>
      </Tabs>
    </>
  )
}
export default ObjectShop
