import React, { useEffect, useState } from 'react'
import { getFormItem } from '@/utils/element'
import { Select, Form, Button, Row, Col } from 'antd'
const { Option } = Select

const columnsInit = [
  {
    name: '合同生成日期',
    type: 'picker',
    options: [],
    key: 'id',
  },
  {
    name: '合同编号',
    type: 'input',
    options: [],
    key: 'id',
  },
  {
    name: '合同开始日期',
    type: 'picker',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '合同结束日期',
    type: 'picker',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '收运单位',
    type: 'select',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '收运单位备注',
    type: 'input',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '干垃圾收运方式',
    type: 'select',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '干垃圾作业频率',
    type: 'select',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '干垃圾作业次数',
    type: 'input',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '干垃圾作业桶数',
    type: 'input',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '湿垃圾作业评率',
    type: 'select',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '湿垃圾作业次数',
    type: 'input',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '湿垃圾作业桶数',
    type: 'input',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '签约日期',
    type: 'picker',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '签约人员',
    type: 'select',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '备注',
    type: 'input',
    disabled: false,
    options: [],
    key: 'id',
  },
]
const ManageShopContract = (props) => {
  const [form] = Form.useForm()
  const [columns, setColumns] = useState(columnsInit)
  const [options, setOptions] = useState([])

  useEffect(() => {
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
