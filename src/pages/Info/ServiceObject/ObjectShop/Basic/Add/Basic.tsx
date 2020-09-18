import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { getFormItem } from '@/utils/element'
import { Tabs, Form, Input, Button, Select } from 'antd'
interface Column {
  key: string
  name: string
  type: string
  options?: []
  [_: string]: any
}
const columns: Column[] = [
  {
    name: '商铺编号',
    type: 'select',
    disabled: false,
    options: [],
    key: 'id',
  },
  {
    name: '名称',
    type: 'input',
    disabled: false,
    key: 'name',
  },
  {
    name: '起始地址ID',
    type: 'select',
    disabled: false,
    options: [],
    key: 'start',
  },
  {
    name: '终止ID',
    type: 'select',
    disabled: false,
    options: [],
    key: 'end',
  },
  {
    name: '地址',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '路段',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '门牌号',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '小门牌号',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '门牌号属性',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '方位属性',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '所属街镇',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '所属居委',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '所属小区',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '物业公司',
    type: 'input',
    disabled: true,
    key: 'address',
  },

  {
    name: '经营属性',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '是否连锁店铺',
    type: 'input',
    disabled: false,
    key: 'address',
  },
  {
    name: '联系人',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '电话',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '所属企业',
    type: 'input',
    disabled: true,
    key: 'address',
  },
  {
    name: '备注',
    type: 'input',
    disabled: true,
    key: 'address',
  },
]

const ManageShopBasicInfo = (props) => {
  const [form] = Form.useForm()
  //表单提交
  const onFinish = (values) => {
    debugger
  }
  //字段改变
  const onFormLayoutChange = (changedValues) => {
    //商铺id选择后填充其他数据
    if (changedValues.address) {
      form.setFieldsValue({ id: 'Hi, man!' })
    }
  }
  return (
    <>
      <h3 className="title-header">{props.blockTitle}</h3>
      <Form
        layout="vertical"
        form={form}
        onValuesChange={onFormLayoutChange}
        onFinish={onFinish}
      >
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
export default ManageShopBasicInfo
