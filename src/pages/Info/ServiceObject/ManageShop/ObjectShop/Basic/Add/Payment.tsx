import React, { useContext, useEffect, useState } from 'react'
import { getPoiInfo } from '@/utils/getPoiInfo'
import { Select, Form, Input, Button, DatePicker, Row, Col } from 'antd'
const { Option } = Select
const style = {
  marginRight: 30,
  display: 'inline-block',
  width: 300,
  verticalAlign: 'middle',
}
const columnsInit = [
  {
    name: '缴费时间',
    type: 'picker',
    key: 'id',
  },
  {
    name: '付款方式',
    type: 'select',
    options: [],
    key: 'id',
  },
  {
    name: '付款账号',
    type: 'input',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '金额',
    type: 'input',
    disabled: false,
    key: 'id',
  },
  {
    name: '付款人',
    type: 'input',
    disabled: false,
    key: 'id',
  },
  {
    name: '付款人联系电话',
    type: 'input',
    disabled: false,
    key: 'id',
  },
]
const ManageShopContract = (props) => {
  const [form] = Form.useForm()
  const [columns, setColumns] = useState(columnsInit)

  useEffect(() => {}, [])

  const mapList = (list) =>
    list.map((item, index: number) => {
      const key = item.key
      if (item.type === 'select') {
        return (
          <Form.Item
            style={style}
            key={index}
            name={key}
            label={item.name}
            // rules={[{ required: true }]}
          >
            <Select
              allowClear
              placeholder={item.name}
              style={{ minWidth: '160px' }}
              disabled={item.disabled}
              key={index}
            >
              {item.options.map((house) => (
                <Select.Option key={house} value={house}>
                  {house}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )
      } else if (item.type === 'input') {
        return (
          <Form.Item key={index} label={item.name} name={key} style={style}>
            <Input disabled={item.disabled} placeholder={item.name} />
          </Form.Item>
        )
      } else if (item.type === 'picker') {
        return (
          <Form.Item key={index} label={item.name} name={key} style={style}>
            <DatePicker style={style} />
          </Form.Item>
        )
      }
    })
  //表单提交
  const onFinish = (values: any) => {
    debugger
  }

  return (
    <>
      <h3 className="title-header"> {props.blockTitle} </h3>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {mapList(columns)}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default ManageShopContract
