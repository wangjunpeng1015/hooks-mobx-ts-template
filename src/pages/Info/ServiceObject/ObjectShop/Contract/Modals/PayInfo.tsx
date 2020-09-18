import React, { useState } from 'react'
import {
  Table,
  Row,
  Col,
  DatePicker,
  Input,
  Select,
  Button,
  Space,
  Modal,
  Pagination,
  Form,
} from 'antd'
import { PlusSquareFilled } from '@ant-design/icons'
import { getFormItem } from '@/utils/element'
import { useHistory } from 'react-router-dom'

//搜索条件
const columnsInit = [
  {
    name: '付款账号',
    type: 'input',
    key: 'qq',
  },
  {
    name: '付款人',
    type: 'input',
    key: 'ww',
  },
  {
    name: '付款人联系电话',
    type: 'input',
    key: 'ww',
  },
  {
    name: '付款方式',
    type: 'select',
    options: [],
    key: 'rr',
  },
  {
    name: '',
    type: 'rangePicker',
    key: 'bb',
  },
]

//表格表头
const tableColumns = [
  {
    title: '缴费时间',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '付款方式',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '付款账号',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '金额',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '付款人',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '付款人联系电话',
    dataIndex: 'address',
    key: 'address',
  },
]
const PayInfo = (_props) => {
  const history = useHistory()
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
  //提交表单
  const onFinish = () => {}
  const add = () => {
    history.push()
  }
  return (
    <>
      {/*  搜索条件  */}
      <Row justify="center" align="top">
        <Col span={21}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            {getFormItem(columns)}
          </Form>
        </Col>
        <Col flex="auto">
          <Button
            type="primary"
            style={{ float: 'right' }}
            onClick={() => add()}
          >
            <PlusSquareFilled />
            添加
          </Button>
        </Col>
      </Row>
      {/* 表格 */}
      <Table
        loading={loading}
        className="table"
        columns={tableColumns.concat([
          {
            title: '编辑',
            render: (item) => (
              <a className="link" onClick={() => openModal(item)}>
                编辑
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
    </>
  )
}
export default PayInfo
