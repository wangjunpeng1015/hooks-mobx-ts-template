import React from 'react'
import {
  Table,
  Row,
  Col,
  DatePicker,
  Input,
  Select,
  Button,
  Space,
  Modal,
  Pagination,
  Form,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Props } from '@/utils'
const { RangePicker } = DatePicker
interface FormItem {
  name: string
  key: string
  type: string
  disabled?: boolean
  options?: never[]
}
interface StyleType {
  marginRight: number
  marginBottom: number
  display: string
  width: number
  verticalAlign: string
}

export const getFormItem = (
  list: FormItem[],
  style: StyleType = {
    marginRight: 20,
    marginBottom: 0,
    display: 'inline-block',
    width: 160,
    verticalAlign: 'middle',
  },
  extraProps: Props = {}
) =>
  list.map((item, index: number) => {
    const key = item.key
    if (item.type === 'select') {
      return (
        <Form.Item style={style} key={index} name={key}>
          <Select
            allowClear
            placeholder={item.name}
            style={{ minWidth: '160px' }}
            disabled={item.disabled}
            key={index}
          >
            {item?.options.map((house) => (
              <Select.Option key={house} value={house}>
                {house}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    } else if (item.type === 'input') {
      return (
        <Form.Item key={index} name={key} style={style}>
          <Input
            onPressEnter={extraProps.enter || null}
            suffix={<SearchOutlined style={{ cursor: 'point' }} />}
            disabled={item.disabled}
            placeholder={item.name}
          />
        </Form.Item>
      )
    } else if (item.type === 'rangePicker') {
      return (
        <Form.Item key={index} name={key} style={{ ...style, width: 280 }}>
          <RangePicker disabled={item.disabled} />
        </Form.Item>
      )
    } else if (item.type === 'rangeInput') {
      return (
        <>
          <Form.Item
            key={index}
            name={key}
            style={{ ...style, width: 80, marginRight: 0 }}
          >
            <Input
              className="underline"
              style={{ width: 80 }}
              placeholder={item.name}
            />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block' }}>至</Form.Item>
          <Form.Item key={index} name={key} style={{ ...style, width: 80 }}>
            <Input
              className="underline"
              style={{ width: 80 }}
              placeholder={item.name}
            />
          </Form.Item>
        </>
      )
    }
  })
