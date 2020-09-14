import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Tabs, Form, Input, Button, Radio } from 'antd'
import { renderComponent } from '@/utils'
const { TabPane } = Tabs

const ManageShopBasicInfo = (props) => {
  const [form] = Form.useForm()
  const onFormLayoutChange = () => {}
  return (
    <Form layout="vertical" form={form} onValuesChange={onFormLayoutChange}>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  )
}
export default ManageShopBasicInfo
