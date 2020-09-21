export interface Columns {
  title: string
  width?: string
  key?: string
  dataIndex?: string
  render?: () => any
}

export interface Props {
  [props: string]: any
}
export interface ComponentParams {
  title: string
  componentPath: string
  key?: string | number
  visible?: boolean
  data?: any
  [_: string]: any
}
