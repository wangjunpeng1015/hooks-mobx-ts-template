import { createContext } from 'react'
import axios from '@/utils/request'
import storage from '@/utils/storage'
import { observable, action } from 'mobx'

class LoginStore {
  @observable loading = false

  @action.bound
  async login(username: string, password: string) {
    debugger
    const res = await axios.post(`/api/user/login`, {
      username,
      password,
    })
    storage.set('auth_data', res, 3600000)
    return res
  }
}

export default createContext(new LoginStore())
