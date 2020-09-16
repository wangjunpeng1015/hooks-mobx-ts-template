declare global {
  interface Window {
    AMap: any
    THREE: any
    amapLoaded: boolean
    Loca: any
  }
}

export class MapCore {
  public get origin() {
    return this._origin
  }

  private _origin: any
  private markers: any[] = []
  private tryCount = [100, 200, 300, 1000, 1000, 1000]

  public init(id: string, config: any) {
    return new Promise((resolve, reject) => {
      this.tryRender(id, config, resolve, reject)
    })
  }

  private tryRender(id: string, config: any, resolve: any, reject: any) {
    if (this.tryCount.length) {
      if (window.amapLoaded) {
        this._origin = new window.AMap.Map(id, config)
        console.log('地图组件加载完成')
        resolve(this._origin)
      } else {
        setTimeout(() => {
          this.tryRender(id, config, resolve, reject)
        }, this.tryCount.shift())
      }
    } else {
      reject(new Error('地图组件加载超时'))
    }
  }
  //删除全部覆盖物
  public removeAllMarker() {
    this._origin.remove([...this.markers])
    this.markers = []
  }
  public addMarker(location: number[]) {
    // 创建点覆盖物
    const marker = new window.AMap.Marker({
      position: new window.AMap.LngLat(...location),
      offset: new window.AMap.Pixel(-10, -10),
      icon: new window.AMap.Icon({
        size: new window.AMap.Size(30, 30), // 图标尺寸
        image:
          '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png', // 添加 Icon 图标 URL
        imageSize: new window.AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
      }),
    })
    this._origin.add(marker)
    this.markers.push(marker)
  }
  //销毁
  public destroy() {
    this._origin.destroy()
  }
}

export default new MapCore()
