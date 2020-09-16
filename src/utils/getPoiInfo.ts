import { webKey } from '@/utils/consts'
import Axios from 'axios'
export const getPoiInfo = async (keywords: string) => {
  const res = await Axios.get(
    `https://restapi.amap.com/v3/place/text?key=${webKey}&keywords=${keywords}`
  )
  return res.data?.pois?.map((v) => formatPoiInfo(v)) || []
}
const formatPoiInfo = (param: any) => {
  return {
    poiId: param.id || 0,
    poiName: param.name || '',
    value: param.name || '',
    poiType: param.type || '',
    typeCode: param.typecode || '',
    bizType: param.biz_type.toString() || '',
    address: param.address || '',
    location: param.location || '',
    poiTel: param.poiTel || '',
    pname: param.pname || '',
    citycode: param.citycode || '',
    cityname: param.cityname || '',
    adcode: param.adcode || '',
    adname: param.adname || '',
    naviPoiId: '',
    gridcode: '',
    businessArea: '',
  }
}
