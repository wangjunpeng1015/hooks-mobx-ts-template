/* eslint-disable import/extensions */
import { createContext } from 'react'
import { observable, action } from 'mobx'
import request from '@/utils/request'
import { message } from 'antd'
class HomeStore {
  @observable loading = false

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
      title: '',
      dataIndex: 'name',
    },
    {
      title: '地址',
      dataIndex: 'chinese',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '路段',
      dataIndex: 'math',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '门牌号',
      dataIndex: 'english',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '小门牌号',
      dataIndex: 'english',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '门牌号属性',
      dataIndex: 'english',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '方位属性',
      dataIndex: 'english',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '所属小区',
      dataIndex: 'english',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '所属街镇',
      dataIndex: 'english',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '所属居委',
      dataIndex: 'english',
      sorter: {
        multiple: 1,
      },
    },
    {
      title: '物业公司',
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
      name: '账单编号',
      type: 'input',
      options: [],
      key: 'aa',
    },
    {
      name: '合同编号',
      type: 'input',
      options: [],
      key: 'aa',
    },
    {
      name: '商铺编号',
      type: 'input',
      key: 'bb',
    },
    {
      name: '商铺名称',
      type: 'input',
      key: 'cc',
    },
    {
      name: '商铺地址',
      type: 'input',
      key: 'dd',
    },
    {
      name: '账单状态',
      type: 'select',
      key: 'ee',
    },
    {
      name: '',
      type: 'rangePicker',
      key: 'ww',
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
  async delOne() {
    this.selectedRowKeys
    const res = await request.post('/delete', { data: this.selectedRowKeys })
    if (res) {
      message.success('删除成功！')
      this.getTableDate()
    }
  }
}

export default createContext(new HomeStore())
