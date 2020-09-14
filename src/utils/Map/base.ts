export interface ThemeMap {
  /**
   * 地图样式 高德地图提供了几个内置皮肤 也可以进行自定义并在这里配置自定义皮肤的id
   */
  mapStyle: string // 'amap://styles/blue', // '6f0d1af9d316a6dd3ad8d1e253e05543', // 'amap://styles/grey',
  /**
   * 是否支持缩放
   */
  resizeEnable: boolean
  /**
   * 是否支持水平旋转
   */
  rotateEnable: boolean
  /**
   * 是否支持垂直旋转 即调整俯仰角度(也可以理解为有多3D)
   */
  pitchEnable: boolean
  /**
   * 缩放等级 3-18 越大越精细
   */
  zoom: number
  /**
   * 垂直旋转角度 越大越容易看到天空(白色部分)
   */
  pitch: number
  /**
   * 开启3D视图,默认为关闭
   */
  viewMode?: '3D'
  /**
   * 楼块出现是否带动画
   */
  buildingAnimation: boolean
  expandZoomRange: boolean
  /**
   * 支持缩放的范围 [最小值, 最大值]
   */
  zooms: number[]
  /**
   * 提供的属性 一般不用改动
   */
  features: string[]
  /**
   * 水平旋转角度
   */
  rotation: number
  /**
   * 中心坐标
   */
  center?: number[]
  /**
   * 是否显示建筑物
   */
  showBuildingBlock?: boolean
}
