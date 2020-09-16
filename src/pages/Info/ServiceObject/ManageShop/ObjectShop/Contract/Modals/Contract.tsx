import React, { useContext, useState } from 'react'
import {
  Table,
  Row,
  Col,
  DatePicker,
  Input,
  Select,
  Button,
  Modal,
  Pagination,
  Form,
} from 'antd'
import {
  PlusSquareFilled,
  SearchOutlined,
  ContainerOutlined,
} from '@ant-design/icons'
import BillModal from './billInfo'
const style = {
  marginRight: 20,
  marginBootom: 0,
  display: 'inline-block',
  width: 160,
  verticalAlign: 'middle',
}
//搜索条件
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
const { RangePicker } = DatePicker

const tableColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]
const ContractInfo = (_props) => {
  const [form] = Form.useForm()
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
  const mapSearchList = (list) =>
    list.map((item, index) => {
      const key = item.key
      if (item.type === 'select') {
        return (
          <Input.Group
            key={index}
            compact
            style={{
              marginRight: 30,
              display: 'inline-block',
              width: 200,
              verticalAlign: 'middle',
            }}
          >
            {/* <span style={{ lineHeight: "30px" }}>{item.name}：</span> */}
            <Select
              allowClear
              placeholder={item.name}
              style={{ minWidth: '160px' }}
              value={key}
              onChange={(e) => search({ key: e.join(',') }, { key: e })}
            >
              {item.options.map((house) => (
                <Select.Option key={house} value={house}>
                  {house}
                </Select.Option>
              ))}
            </Select>
          </Input.Group>
        )
      } else if (item.type === 'input') {
        return (
          <Input.Group
            key={index}
            compact
            style={{
              marginRight: 30,
              display: 'inline-block',
              width: 200,
              verticalAlign: 'middle',
            }}
          >
            {/* <span style={{ lineHeight: "30px" }}>{item.name}：</span> */}
            <Input
              style={{ width: 160 }}
              placeholder={item.name}
              onPressEnter={search}
              suffix={<SearchOutlined style={{ cursor: 'point' }} />}
            />
          </Input.Group>
        )
      } else if (item.type === 'rangePicker') {
        return <RangePicker />
      }
    })
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
            <DatePicker disabled={item.disabled} style={style} />
          </Form.Item>
        )
      }
    })
  //删除
  const remove = () => {}
  //显示弹窗
  const openModal = (data, modalKey) => {}
  //弹窗关闭
  const modalClose = (modalKey) => {}
  //提交表单
  const onFinish = () => {}
  return (
    <>
      {/*  搜索条件  */}
      <Row justify="center" align="top">
        <Col span={22}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            {mapList(columns)}
          </Form>
        </Col>
        <Col span={2}>
          <Row>
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => openModal(null, 'edit')}
            >
              <ContainerOutlined />
              查看账单
            </Button>
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => openModal(null, 'edit')}
            >
              <PlusSquareFilled />
              添加
            </Button>
          </Row>
        </Col>
      </Row>
      {/* 表格 */}
      <Table
        loading={loading}
        className="table"
        columns={tableColumns}
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
      {/* 弹窗 */}
      {/* <BillModal visible={} id={} /> */}
    </>
  )
}
export default ContractInfo
