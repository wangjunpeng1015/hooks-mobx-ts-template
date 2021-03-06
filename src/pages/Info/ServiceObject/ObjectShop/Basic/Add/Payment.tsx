import React, { useEffect, useState } from 'react'
import { getFormItem } from '@/utils/element'
import { Form, Button } from 'antd'

const ManageShopContract = (props) => {
  const [form] = Form.useForm()
  const [columns, setColumns] = useState<any[]>([])

  useEffect(() => {
    setColumns([
      [
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
      ],
    ])
  }, [])

  //表单提交
  const onFinish = (values: any) => {
    debugger
  }

  return (
    <>
      <h3 className="title-header"> {props.blockTitle} </h3>
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
