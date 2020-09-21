import React, { useState } from 'react'
import { Table, Row, Col, Button, Space, Modal, Pagination, Form } from 'antd'
import { getFormItem } from '@/utils/element'
import { PlusSquareFilled, ContainerOutlined } from '@ant-design/icons'
import BillModal from './billInfo'
import { ColumnsType } from 'antd/es/table'
import { Columns } from '@/utils/interface'

const style = {
  marginRight: 20,
  marginBottom: 0,
  display: 'inline-block',
  width: 160,
  verticalAlign: 'middle',
}
//搜索条件
const columnsInit = [
  {
    name: '合同编号',
    type: 'input',
    key: 'qq',
  },
  {
    name: '联系人',
    type: 'inpu',
    key: 'ww',
  },
  {
    name: '金额',
    type: 'inpu',
    key: 'ww',
  },
  {
    name: '收运单位',
    type: 'select',
    options: [],
    key: 'rr',
  },
  {
    name: '备注',
    type: 'inpu',
    options: [],
    key: 'bb',
  },
  {
    name: '签约人员',
    type: 'select',
    options: [],
    key: 'bb',
  },
  {
    name: '',
    type: 'rangePicker',
    key: 'bb',
  },
  {
    name: '',
    type: 'rangeInput',
    key: 'bb',
  },
]

//表格表头
const tableColumns: ColumnsType<Columns> = [
  {
    title: '合同生成日期',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '合同编号',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '合同开始日期',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '收运单位',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '收运单位备注',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '干垃圾收运方式',
    dataIndex: 'address',
    key: 'address',
  },
]
const ContractInfo = (_props) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [columns, setColumns] = useState(columnsInit)
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    current: 1,
  })

  const search = () => {
    setLoading(true)
    setTableData([])
    setLoading(false)
  }
  const currentChange = (num: number) => {
    setPagination({
      ...pagination,
      current: num,
    })
    search()
  }

  //显示弹窗
  const openModal = () => {
    setVisible(true)
  }
  //弹窗关闭
  const modalClose = (modalKey) => {}
  //提交表单
  const onFinish = () => {}
  return (
    <>
      {/*  搜索条件  */}
      <Row justify="center" align="top">
        <Col span={21}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            {getFormItem(columns)}
            <Form.Item style={style}>
              <Button type="primary" onClick={() => search()}>
                搜索
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col flex="auto">
          <Space direction="vertical">
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => openModal()}
            >
              <ContainerOutlined />
              查看账单
            </Button>
            <Button type="primary" style={{ float: 'right' }}>
              <PlusSquareFilled />
              添加
            </Button>
          </Space>
        </Col>
      </Row>
      {/* 表格 */}
      <Table
        loading={loading}
        className="table"
        columns={tableColumns.concat([
          {
            title: '服务信息',
            render: (item) => (
              <a className="link" onClick={() => openModal(item)}>
                服务信息
              </a>
            ),
            width: '40',
          },
        ])}
        pagination={false}
        dataSource={tableData}
      />
      {/* 分页 */}
      <Row justify="end">
        <Pagination
          total={pagination.total}
          showSizeChanger
          showQuickJumper
          defaultPageSize={pagination.pageSize}
          current={pagination.current}
          showTotal={(total) => `共 ${total} 条`}
          onChange={(num) => currentChange(num)}
        />
      </Row>
      {/* 账单信息弹窗 */}
      <Modal
        title="合同信息-账单信息"
        visible={visible}
        width={1100}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <BillModal props={_props} />
      </Modal>
    </>
  )
}
export default ContractInfo
