import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import {
  Table,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Pagination,
} from 'antd'
import {
  PlusSquareFilled,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { renderComponent } from '@/utils'
import Store from './basecStore'
interface columns {
  title: string
  dataIndex?: string
  [_: string]: any
}
const style = {
  marginRight: 20,
  marginBottom: 0,
  display: 'inline-block',
  width: 200,
  verticalAlign: 'middle',
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
  const mapSearchList = (list) =>
    list.map((item, index) => {
      const key = item.key
      if (item.type === 'select') {
        return (
          <Form.Item style={style} key={index} name={key} label={item.name}>
            <Select
              allowClear
              placeholder={item.name}
              style={{ minWidth: '160px' }}
              value={key}
              onChange={(e) => search()}
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
            <Input
              onPressEnter={search}
              disabled={item.disabled}
              placeholder={item.name}
            />
          </Form.Item>
        )
      }
    })
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
            <Row>{mapSearchList(store.searchListDom.slice(0, 6))}</Row>
            <Row style={{ marginTop: '12px' }}>
              {mapSearchList(store.searchListDom.slice(6, 12))}
            </Row>
            <Row style={{ marginTop: '12px' }}>
              {mapSearchList(store.searchListDom.slice(12, 18))}
            </Row>
            <Row style={{ marginTop: '12px' }}>
              {mapSearchList(store.searchListDom.slice(18, 20))}
            </Row>
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
