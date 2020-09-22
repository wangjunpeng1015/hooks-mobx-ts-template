import React, { useEffect, useState } from 'react'
import { getFormItem } from '@/utils/element'
import { Select, Form, Button, Row, Col } from 'antd'
const { Option } = Select

const columnsInit = [
  {
    name: '合同生成日期',
    type: 'picker',
    options: [],
    key: 'qq',
  },
  {
    name: '账单生成日期',
    type: 'picker',
    options: [],
    key: 'ww',
  },
  {
    name: '账单编号',
    type: 'input',
    options: [],
    key: 'rr',
  },
  {
    name: '账单计费开始日期',
    type: 'picker',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '账单计费结束日期',
    type: 'picker',
    disabled: false,
    options: [],
    key: 'aa',
  },
  {
    name: '账单状态',
    type: 'select',
    disabled: false,
    options: [],
    key: 'bb',
  },
]
const ManageShopContract = (props) => {
  const [form] = Form.useForm()
  const [columns, setColumns] = useState<any[]>([])
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    setColumns(columnsInit)
    setOptions([
      {
        name: 'aa',
        value: 1,
      },
      {
        name: 'bb',
        value: 2,
      },
    ])
  }, [])

  //表单提交
  const onFinish = (values: any) => {
    debugger
  }
  //合同变化
  const onSelect = (value, option) => {
    //清空
    // form.resetFields()
    // AMap.addMarker(location)
  }

  return (
    <>
      <Row align="middle" justify="space-between">
        <Row align="middle" justify="space-between">
          <h3 className="title-header"> {props.blockTitle} </h3>
          <Select bordered={false} style={{ width: 120 }} onChange={onSelect}>
            {options.map((item: any) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Row>
        <Col>
          <Button type="primary">新增</Button>
        </Col>
      </Row>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {getFormItem(columns)}
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
