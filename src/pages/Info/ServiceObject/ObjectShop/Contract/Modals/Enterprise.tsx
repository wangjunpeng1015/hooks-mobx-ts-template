import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Button, Pagination, Form } from 'antd'
import { PlusSquareFilled } from '@ant-design/icons'
import { getFormItem } from '@/utils/element'
import { ColumnsType } from 'antd/es/table'
import { Columns } from '@/utils/interface'
//搜索条件
const columnsInit = [
  {
    name: '联系人',
    type: 'input',
    key: 'qq',
  },
  {
    name: '联系人电话',
    type: 'input',
    key: 'ss',
  },
  {
    name: '地址',
    type: 'input',
    key: 'ww',
  },
]

//表格表头
const tableColumns: ColumnsType<Columns> = [
  {
    title: '联系人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '联系电话',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
]
const EnterpriseInfo = (_props) => {
  const [form] = Form.useForm()
  const [columns, setColumns] = useState(columnsInit)
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [tableData, setTableData] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    current: 1,
  })

  useEffect(() => {
    setColumns([])
  }, [])
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

  //表格选择项
  const onSelectChange = (_selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRows.map((n: any) => n.key))
  }

  //弹窗关闭
  const remove = () => {}
  //提交表单
  const onFinish = () => {}
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
          <Button type="primary" style={{ float: 'right' }}>
            <PlusSquareFilled />
            添加
          </Button>
        </Col>
      </Row>
      {/* 表格 */}
      <Table
        loading={loading}
        className="table"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={tableColumns.concat([
          {
            title: '编辑',
            dataIndex: 'edit',
            render: (item) => <a className="link">编辑</a>,
            width: '40',
          },
        ])}
        pagination={false}
        dataSource={tableData}
      />
      {/* 分页 */}
      <Row justify="space-between">
        <Col>
          <Button block onClick={remove}>
            删除
          </Button>
        </Col>
        <Col>
          <Pagination
            total={pagination.total}
            showSizeChanger
            showQuickJumper
            defaultPageSize={pagination.pageSize}
            current={pagination.current}
            showTotal={(total) => `共 ${total} 条`}
            onChange={(num) => currentChange(num)}
          />
        </Col>
      </Row>
    </>
  )
}
export default EnterpriseInfo
