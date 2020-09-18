/* eslint-disable import/extensions */
import { createContext } from 'react'
import { observable, action } from 'mobx'
import request from '@/utils/request'
import { message } from 'antd'
class HomeStore {
  @observable loading = false
  @observable modals = [
    {
      title: '合同信息',
      visible: false,
      data: null,
      key: 'contract',
    },
    {
      title: '企业信息',
      visible: false,
      data: null,
      key: 'enterprise',
    },
    {
      title: '照片列表',
      visible: false,
      data: null,
      key: 'photo',
    },
    {
      title: '操作',
      visible: false,
      data: null,
      key: 'edit',
    },
  ]

  @observable tableData = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ]

  @observable columns = [
    {
      title: '居委',
      dataIndex: 'name',
    },
    {
      title: '所属小区',
      dataIndex: 'chinese',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: 'Math Score',
      dataIndex: 'math',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: 'English Score',
      dataIndex: 'english',
      sorter: {
        multiple: 1,
      },
    },
  ]

  @observable total = 50
  @observable curent = 1
  @observable pageSize = 10

  @observable searchListDom = [
    {
      name: '商铺编号',
      type: 'select',
      options: [],
      key: '',
    },
    {
      name: '名称',
      type: 'input',
      key: '',
    },
    {
      name: '地址',
      type: 'input',
      key: '',
    },
    {
      name: '路段',
      type: 'input',
      key: '',
    },
    {
      name: '门牌号',
      type: 'input',
      key: '',
    },
    {
      name: '小门牌号',
      type: 'input',
      key: '',
    },
    {
      name: '联系人',
      type: 'input',
      key: '',
    },
    {
      name: '电话',
      type: 'input',
      key: '',
    },
    {
      name: '所属企业',
      type: 'select',
      options: [],
      key: '',
    },
    {
      name: '备注',
      type: 'input',
      key: '',
    },
    {
      name: '起始地址ID',
      type: 'input',
      key: '',
    },
    {
      name: '终止地址ID',
      type: 'input',
      key: '',
    },
    {
      name: '门牌号属性',
      type: 'input',
      key: '',
    },
    {
      name: '方位属性',
      type: 'input',
      key: '',
    },
    {
      name: '所属街镇',
      type: 'input',
      key: '',
    },
    {
      name: '所属居委',
      type: 'input',
      key: '',
    },
    {
      name: '所属小区',
      type: 'input',
      key: '',
    },
    {
      name: '物业公司',
      type: 'input',
      key: '',
    },
    {
      name: '经营属性',
      type: 'input',
      key: '',
    },
    {
      name: '是否连锁店铺',
      type: 'input',
      key: '',
    },
  ]

  @observable selectedRowKeys = [] //选中项

  @observable sortItems = {} //筛选条件

  // 列表数据
  @action.bound
  async getTableDate() {
    // this.loading = true
    const res = await request.post('/list', {
      pageNum: this.curent,
      pageSize: this.pageSize,
      ...this.sortItems,
    })
    if (res) {
      this.tableData = res.data || []
    }
    this.loading = false
  }
  // 删除
  @action.bound
  async delOne(data) {
    const res = await request.post('/delete', { data })
    if (res) {
      message.success('删除成功！')
      this.getTableDate()
    }
  }
}

export default createContext(new HomeStore())
