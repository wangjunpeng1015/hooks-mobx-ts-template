/* eslint-disable import/extensions */
import React, { useContext, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import store from './store'
import './style.scss'

const LoginPage = (props) => {
  const history = useHistory()
  // useContext 订阅mobx数据
  const loginStore = useContext(store)
  const [hidePassword, setHidePassword] = useState(true)
  const onFinish = (value) => {
    loginStore.login(value).then((res) => {
      history.push('/')
    })
  }
  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    console.log('Failed:', errorFields)
  }
  return (
    <div className="page-login">
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <div className="login-title">登录</div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input style={{ height: 40 }} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input
            style={{ height: 40 }}
            suffix={
              <i
                onClick={() => setHidePassword(!hidePassword)}
                className={`zhhwfont ${
                  hidePassword ? 'iconmimayincang' : 'iconmima-xianshi'
                }`}
              ></i>
            }
            type={`${hidePassword ? 'password' : ''}`}
            placeholder="密码"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        <Form.Item>
          <a className="login-form-forgot" href="">
            忘记密码
          </a>
          <Link className="login-form-register" to="/register">
            注册
          </Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default observer(LoginPage)
