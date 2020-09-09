import axios from 'axios'
import { message } from 'antd'
import { appStores } from '@/stores'
import { useHistory } from 'react-router-dom'
const history = useHistory()
const { globalStore } = appStores()
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (globalStore.token) {
      // config.headers['token'] = getToken()
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { status, data, statusText } = response
    if (status === 200) {
      if (data && data.resultCode === '100' && data.success === true) {
        return data.data
      } else {
        message.error(data.msg)
        if (data.resultCode === '1004') {
          globalStore.logOut()
          setTimeout(() => {
            history.push('/login')
          }, 0)
          return {}
        }
        return Promise.reject(data.msg || 'Error')
        // return {}
      }
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `${status}: ${statusText}`
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
