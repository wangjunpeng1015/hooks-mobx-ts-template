import React from 'react'
import { DatePicker, Input, Select, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Props } from '@/utils/interface'
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

export const Style = {
  marginRight: 20,
  marginBottom: 12,
  display: 'inline-block',
  width: 160,
  verticalAlign: 'middle',
}
export const getFormItem = (
  list: FormItem[],
  style: StyleType = Style,
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
            {item.options &&
              item.options.map((n: any) => (
                <Select.Option key={n.key} value={n.value}>
                  {n.value}
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
    } else if (item.type === 'picker') {
      return (
        <Form.Item key={index} name={key} style={style}>
          <DatePicker style={style} />
        </Form.Item>
      )
    } else if (item.type === 'rangePicker') {
      return (
        <Form.Item key={index} name={key} style={{ ...style, width: 280 }}>
          <RangePicker
            onChange={(e, str) => extraProps.enter}
            allowClear
            disabled={item.disabled}
          />
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
              onPressEnter={extraProps.enter || null}
              style={{ width: 80 }}
              placeholder="开始值"
            />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block' }}>至</Form.Item>
          <Form.Item key={index} name={key} style={{ ...style, width: 80 }}>
            <Input
              className="underline"
              onPressEnter={extraProps.enter || null}
              style={{ width: 80 }}
              placeholder="结束值"
            />
          </Form.Item>
        </>
      )
    }
  })
