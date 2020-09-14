import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Modal, Button } from 'antd'
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons'
const AddBlock = (props) => {
  const handleOk = () => {
    debugger
  }
  return (
    <Modal
      maskClosable={false}
      title={props.blockTitle}
      visible={props.visible}
      onOk={handleOk}
      onCancel={() => props.close()}
    >
      <p>fdsa</p>
    </Modal>
  )
}
export default AddBlock
