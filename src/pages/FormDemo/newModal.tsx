// @ts-nocheck
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Form, Input, Select, Modal } from 'antd'
import { toJS } from 'mobx'
import Store from './store'

const status = [
  { key: true, label: '正常' },
  { key: false, label: '停用' },
]

interface ModalData {
  name: string
  id: number
  status: boolean
  [_: string]: any
}

const myModal = (props: { form: any }) => {
  const {
    form: { getFieldDecorator },
  } = props
  const pageStore = useContext(Store)
  const modalData = toJS(pageStore.modalData) as ModalData

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log(values);
        pageStore.addNew(values)
      }
    })
  }
  return (
    <Modal
      title={pageStore.modalTitle}
      visible={pageStore.newModalVisible}
      onOk={handleSubmit}
      onCancel={() => pageStore.setData({ newModalVisible: false })}
      okButtonProps={{ loading: pageStore.newLoading }}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="项目名称">
          {getFieldDecorator('name', {
            initialValue: modalData.name,
            rules: [
              { required: true, whitespace: true, message: '请输入项目名称' },
            ],
          })(<Input placeholder="请输入项目名称" maxLength={64} />)}
        </Form.Item>
        <Form.Item label="标识">
          {getFieldDecorator('id', {
            initialValue: modalData.id,
            rules: [
              { required: true, whitespace: true, message: '请输入标识' },
              {
                pattern: /^[A-Za-z0-9_]+$/,
                message: '请输入字母、数字、下划线组合',
              },
            ],
          })(
            <Input
              placeholder="请输入标识"
              maxLength={64}
              disabled={pageStore.modalType !== 'new'}
            />
          )}
        </Form.Item>
        <Form.Item label="状态">
          {getFieldDecorator('status', {
            initialValue:
              modalData.status !== undefined ? modalData.status : true,
            rules: [{ required: true, message: '请选择状态' }],
          })(
            <Select placeholder="请选择状态">
              {status.map((item) => (
                <Select.Option value={item.key} key={item.key}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default observer(myModal)
