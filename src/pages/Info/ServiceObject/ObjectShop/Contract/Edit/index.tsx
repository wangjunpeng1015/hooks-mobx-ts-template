import React from 'react'
import { Modal } from 'antd'
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
