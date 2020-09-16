// @ts-nocheck
import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Table, Row, Col, Input, Select, Button, Modal, Pagination } from 'antd'
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons'
import { renderComponent } from '@/utils'
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
    componentPath:
      'pages/Info/ServiceObject/ManageShop/ObjectShop/Contract/Modals/Contract.tsx',
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
  const [visible, setVisible] = useState(false)
  const [modalData, setModalData] = useState({})
  const [curentModal, setCurentModal] = useState({})

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
    setVisible(true)
    setModalData({
      data,
      key: modalKey,
    })
    setCurentModal(modals.find((n) => n.key === modalKey))
  }
  //弹窗关闭
  const modalClose = (modalKey) => {
    setVisible(false)
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
        columns={toJS(store.columns).concat(
          modals.map((modal) => ({
            title: modal.title,
            render: (item) => (
              <a className="link" onClick={() => openModal(item, modal.key)}>
                {modal.title}
              </a>
            ),
            width: '40',
          }))
        )}
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
      {/* 弹窗 */}
      {curentModal.title && (
        <Modal
          width={1000}
          title={curentModal.title}
          visible={visible}
          onCancel={modalClose}
          footer={null}
        >
          {renderComponent(curentModal, modalData.data)}
        </Modal>
      )}
    </>
  )
}
export default observer(Basic)
