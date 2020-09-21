import React, { useEffect, useState } from 'react'
import { getPoiInfo } from '@/utils/getPoiInfo'
import { Form, Input, Button, AutoComplete } from 'antd'
import { MapCore } from '@/utils/Map/core'
import { Style } from '@/utils/element'

let AMap: MapCore
const ManageShopEnterprise = (props) => {
  const [form] = Form.useForm()
  const [options, setOptions] = useState([])
  const [mapInfo, setMapInfo] = useState([]) //地图附属信息
  useEffect(() => {
    AMap = new MapCore()
    AMap.init('poi-map', {
      resizeEnable: true,
      expandZoomRange: true,
    })
    return () => {
      AMap.destroy()
    }
  }, [])
  //表单提交
  const onFinish = (values: any) => {
    debugger
  }
  const onSelect = (value, option) => {
    const location = option.location.split(',').map((n: string) => Number(n))
    // AMap.addMarker(location)
    AMap.origin.setZoomAndCenter(17, location) //设置地图层级和位置
    setMapInfo(option)
  }
  //搜索poi
  const getPoi = async (keywords: string) => {
    const res = await getPoiInfo(keywords)
    setOptions(res)
  }
  return (
    <>
      <h3 className="title-header">{props.blockTitle}</h3>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="联系人" name="people" style={Style}>
          <Input placeholder="请输入联系人" />
        </Form.Item>
        <Form.Item label="联系电话" name="people" style={Style}>
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item label="地址" name="address" style={Style}>
          <AutoComplete
            options={options}
            placeholder="请输入地址"
            onSelect={onSelect}
            onSearch={getPoi}
          />
        </Form.Item>
        <div id="poi-map"></div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default ManageShopEnterprise
