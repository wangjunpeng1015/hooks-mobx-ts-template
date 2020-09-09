/* eslint-disable import/extensions */
// @ts-nocheck
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'

import { appStores } from '@/stores'
import loginStore from './store'
import './style.scss'

const LoginPage = (props) => {
  const history = useHistory()
  // useContext 订阅mobx数据
  const loginStore = useContext(loginStore)
  const { globalStore } = appStores()

  const handleSubmit = (values) => {
    console.log('登录信息 ', values)
    message.success('登录成功，即将跳转...', 2)
    setTimeout(() => {
      history.push('/')
    }, 2000)
  }
  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    console.log('Failed:', errorFields)
  }
  return (
    <div className="page-login">
      <Form
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <div className="login-title">欢迎登录 {globalStore.appTitle}</div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item valuePropName="checked" initialValue={true}>
          <Checkbox>记住我</Checkbox>
          <a className="login-form-forgot" href="">
            忘记密码
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default observer(LoginPage)
