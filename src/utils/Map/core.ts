import { ThemeMap } from './base'
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
  private tryCount = [100, 200, 300, 1000, 1000, 1000]

  public init(id: string, config: ThemeMap) {
    return new Promise((resolve, reject) => {
      this.tryRender(id, config, resolve, reject)
    })
  }

  private tryRender(id: string, config: ThemeMap, resolve: any, reject: any) {
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
}

export default new MapCore()
