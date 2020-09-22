var fs = require('fs')
//当前配置项
const currentDir = './src' //所选择的目录
const NeedDeleteDir = '.d.ts' //需要删除的文件夹包括文件夹下的内容

console.info('当前目录：', fs.realpathSync(currentDir))
console.log('starting delect path, please wait .......')

//读取所有该目录下的文件。
const ReadDir = function (path) {
  if (fs.existsSync(path)) {
    //检测路径是否存在
    fs.readdir(path, function (err, files) {
      //读取路径
      if (err) return console.log('ERROR-ReadDir:', err)

      files.forEach(function (file) {
        //检测路径是否是文件夹
        if (fs.statSync(path + '/' + file).isDirectory()) {
          ReadDir(path + '/' + file) //递归子文件夹
        } else {
          opetateDir(path + '/' + file)
        }
      })
    })
  }
}

//删除文件
const opetateDir = function (path) {
  if (path.includes('types')) return
  if (fs.existsSync(path) && path.includes(NeedDeleteDir)) {
    fs.unlinkSync(path) //删除文件
  }
}

//开始执行
ReadDir(currentDir)
