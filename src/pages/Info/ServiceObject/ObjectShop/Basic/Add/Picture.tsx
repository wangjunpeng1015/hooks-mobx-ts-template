import React, { useContext, useEffect, useState } from 'react'
import Picture from '@/components/Picture'
const ManageShopPic = (props) => {
  const [fileList, setFileList] = useState([
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
  return (
    <>
      <h3 className="title-header">{props.blockTitle}</h3>
      <Picture />
    </>
  )
}
export default ManageShopPic
