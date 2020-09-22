import React, { useEffect, useState } from 'react'
import Picture from '@/components/Picture'
interface photoList {
  uid: string
  name: string
  status: string
  url: string
}
const ManageShopPic = (props) => {
  const [fileList, setFileList] = useState<photoList[]>([])
  useEffect(() => {
    setFileList([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ])
  }, [])
  return (
    <>
      <h3 className="title-header">{props.blockTitle}</h3>
      <Picture data={fileList} />
    </>
  )
}
export default ManageShopPic
