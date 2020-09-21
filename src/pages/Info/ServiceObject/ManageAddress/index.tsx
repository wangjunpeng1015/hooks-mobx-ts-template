import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Table, Modal, Form, Row, Col, Button, Pagination } from 'antd'
import { PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { getFormItem } from '@/utils/element'
import Store from './Store'
interface columns {
  title: string
  dataIndex?: string
  [_: string]: any
}

const Basic = (_props) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const store = useContext(Store)
  const onSelectChange = (_selectedRowKeys, selectedRows) => {
    store.selectedRowKeys = selectedRows.map((n: any) => n.key)
  }
  const search = () => {
    store.getTableDate()
  }

  const tableChange = (_pagination, _filters, sorter, _extra) => {
    const obj: any = {}
    if (Array.isArray(sorter)) {
      sorter.forEach((item) => {
        obj[item['field']] = item.order
      })
    } else {
      obj[sorter['field']] = sorter.order
    }
    store.sortItems = obj
    search()
  }
  //删除
  const remove = () => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除当前所选？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        store.delOne()
      },
    })
  }
  //跳转添加
  const openModal = () => {
    history.push({
      pathname: '/info/service-object/manage-shop-basic/0',
      datas: {
        aa: true,
      },
    })
  }
  const onFinish = () => {}
  return (
    <>
      {/*  搜索条件  */}
      <Row justify="center" align="top">
        <Col span={22}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            {getFormItem(store.searchListDom)}
          </Form>
        </Col>
        <Col span={2}>
          <Row>
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => openModal()}
            >
              <PlusSquareFilled />
              添加
            </Button>
          </Row>
        </Col>
      </Row>
      {/* 表格 */}
      <Table
        loading={store.loading}
        className="table"
        rowSelection={{
          selectedRowKeys: store.selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={
          toJS(store.columns).concat([
            {
              title: '操作',
              render: (item) => (
                <a className="link" onClick={() => openModal(item)}>
                  编辑
                </a>
              ),
              width: '40',
            },
          ]) as columns[]
        }
        pagination={false}
        dataSource={toJS(store.tableData)}
        onChange={tableChange}
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
            total={store.total}
            showSizeChanger
            showQuickJumper
            defaultPageSize={store.pageSize}
            current={store.curent}
            showTotal={(total) => `共 ${total} 条`}
            onChange={(num) => {
              store.curent = num
              store.getTableDate()
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default observer(Basic)
