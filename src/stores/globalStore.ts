// @ts-nocheck
import { observable, action } from 'mobx'
import storage from '@/utils/storage'
// import request from '@/services/request';
// import logo from '@/assets/images/header-logo'
export default class GlobalStore {
  @observable appTitle = '智慧环卫业务管理平台'

  @observable firstMenuPath = '/info' // 一级菜单

  @observable collapsed = false // 菜单收起展开

  @observable token = null
  @observable userInfo = {
    // 当前用户信息
    loginName: 'nowThen',
  }

  @action.bound toggleCollapsed() {
    this.collapsed = !this.collapsed
  }
  //清除登录信息
  @action.bound lotOut() {
    storage.remove('token')
    storage.remove('userInfo')
    setTimeout(() => {
      location.reload()
    }, 0)
  }

  @action.bound setData(data = {}) {
    Object.entries(data).forEach((item) => {
      this[item[0]] = item[1]
    })
  }
}
