import React, { useContext, useEffect, useState } from 'react'
import { Upload, Modal, Row, Col } from 'antd'
import { PictureOutlined, CloseOutlined } from '@ant-design/icons'

const PictrueComponents = (props) => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])
  const [preVisible, setPreVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState()
  //预览
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreVisible(true)
  }
  //删除图片
  const onRemove = (data) => {
    debugger
  }
  //上传图片
  const customRequest = (file) => {
    debugger
  }

  return (
    <div className="photo-list">
      <div className="photo-scroll">
        <Upload
          style={{ cursor: 'pointer' }}
          className="photo-list-content"
          multiple
          showUploadList={false}
          customRequest={customRequest}
        >
          <div className="file-upload">
            <PictureOutlined />
            <p>点击上传照12片</p>
          </div>
        </Upload>
        {fileList.map((pic) => (
          <div
            className="photo-list-content"
            onClick={() => handlePreview(pic)}
          >
            <div
              className="close"
              onClick={(e) => {
                e.stopPropagation()
                onRemove(pic)
              }}
            >
              <CloseOutlined style={{ color: '#fff' }} />
            </div>
            <img src={pic.url} alt="" />
          </div>
        ))}
      </div>
      <Modal
        visible={preVisible}
        footer={null}
        onCancel={() => setPreVisible(false)}
      >
        <img style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default PictrueComponents
