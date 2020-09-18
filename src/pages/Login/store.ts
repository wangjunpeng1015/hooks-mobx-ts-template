import { createContext } from 'react'
import { message } from 'antd'
import axios from '@/utils/request'
import { cachedTime } from '@/utils/consts'
import storage from '@/utils/storage'
import { observable, action } from 'mobx'
class LoginStore {
  @observable loading = false

  @action.bound
  async login({ username: string, password: string }) {
    message.success('登录成功，即将跳转...', 2)
    return new Promise((resolve, reject) => {
      return resolve()
    })
    const res = await axios.post(`/api/user/login`, {
      username,
      password,
    })
    storage.set('auth_data', res, cachedTime.long)
    return res
  }
}

export default createContext(new LoginStore())
