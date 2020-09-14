// @ts-nocheck
import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Table, Row, Col, Input, Select, Button, Pagination } from 'antd'
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons'
import Store from './basecStore'
interface columns {
  title: string
  dataIndex?: string
  [_: string]: any
}
const initModals = [
  {
    title: '合同信息',
    visible: false,
    data: null,
    key: 'contract',
    componentPath: 'Add/index.tsx',
  },
  {
    title: '企业信息',
    visible: false,
    data: null,
    key: 'enterprise',
    componentPath: 'Add/index.tsx',
  },
  {
    title: '照片列表',
    visible: false,
    data: null,
    key: 'photo',
    componentPath: 'Add/index.tsx',
  },
  {
    title: '操作',
    visible: false,
    data: null,
    key: 'edit',
    componentPath: 'Add/index.tsx',
  },
]

const Basic = (_props) => {
  const [modals, setModal] = useState(initModals)

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
  const remove = () => {}
  //显示弹窗
  const openModal = (data, modalKey) => {
    const modal = modals.find((n) => n.key == modalKey)
    modal.data = data
    modal.visible = true
    setModal([...modals, modal])
  }
  //弹窗关闭
  const modalClose = (modalKey) => {
    const modal = modals.find((n) => n.key == modalKey)
    modal.data = null
    modal.visible = false
    setModal([...modals, modal])
  }
  return (
    <>
      {/*  搜索条件  */}
      <Row justify="center" align="top">
        <Col span={22}>
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
        </Col>
        <Col span={2}>
          <Row>
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
        loading={store.loading}
        className="table"
        rowSelection={{
          selectedRowKeys: store.selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={
          toJS(store.columns).concat([
            {
              title: '合同信息',
              render: (item) => (
                <a className="link" onClick={() => openModal(item, 'contract')}>
                  合同信息
                </a>
              ),
              width: '40',
            },
            {
              title: '企业信息',
              render: (item) => (
                <a
                  className="link"
                  onClick={() => openModal(item, 'enterprise')}
                >
                  企业信息
                </a>
              ),
              width: '40',
            },
            {
              title: '照片列表',
              render: (item) => (
                <a className="link" onClick={() => openModal(item, 'photo')}>
                  查看
                </a>
              ),
              width: '40',
            },
            {
              title: '操作',
              render: (item) => (
                <a className="link" onClick={() => openModal(item, 'edit')}>
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
      {/* 新增、编辑弹窗 */}
      {modals.map((block) =>
        renderComponent(block, {
          close: () => modalClose(block.key),
        })
      )}
    </>
  )
}
function renderComponent(
  { title, data, key, visible, componentPath },
  extraProps = {}
) {
  try {
    const Component = require(`../${componentPath}`).default
    return (
      <Component
        {...extraProps}
        data={data}
        visible={visible}
        blockTitle={title}
        key={key}
      />
    )
  } catch (e) {
    return null
  }
}
export default observer(Basic)
