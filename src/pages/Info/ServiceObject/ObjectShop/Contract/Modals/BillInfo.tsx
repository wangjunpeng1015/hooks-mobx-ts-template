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
import {
  PlusSquareFilled,
  SearchOutlined,
  AccountBookOutlined,
} from '@ant-design/icons'
import PayModal from './PayInfo'
import { ColumnsType } from 'antd/es/table'
import { Columns } from '@/utils/interface'
const { RangePicker } = DatePicker

const style = {
  marginRight: 20,
  marginBottom: 0,
  display: 'inline-block',
  width: 160,
  verticalAlign: 'middle',
}
//表格表头
const tableColumns: ColumnsType<Columns> = [
  {
    title: '账单生成日期',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '账单编号',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '账单计费开始日期',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '账单计费结束日期',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '账单状态',
    dataIndex: 'address',
    key: 'address',
  },
]
const BillInfo = (_props) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [options, setOptions] = useState([])
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
  //提交表单
  const onFinish = () => {}
  return (
    <>
      {/*  搜索条件  */}
      <Row justify="space-between" align="top">
        <Col span={18}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item name="id" style={style}>
              <Input
                onPressEnter={search}
                suffix={<SearchOutlined style={{ cursor: 'point' }} />}
                placeholder="账单编号"
              />
            </Form.Item>
            <Form.Item style={style} name="status">
              <Select
                allowClear
                placeholder="账单状态"
                style={{ minWidth: '160px' }}
              >
                {options.map((house) => (
                  <Select.Option key={house} value={house}>
                    {house}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="times" style={{ ...style, width: 280 }}>
              <RangePicker />
            </Form.Item>
          </Form>
        </Col>
        <Col flex="auto">
          <Space>
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => openModal()}
            >
              <AccountBookOutlined />
              查看缴费信息
            </Button>
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => openModal()}
            >
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
            title: '操作',
            render: (item) => (
              <a className="link" onClick={() => edit(item)}>
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
      {/* 缴费信息弹窗 */}
      <Modal
        title="合同信息-账单信息-缴费信息"
        visible={visible}
        width={1000}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <PayModal props={_props} />
      </Modal>
    </>
  )
}
export default BillInfo
