# hooks-mobx-ts-template

使用 hooks+mobx+ts

## 开发

### 启动

```shell
npm run start
```

### Icon

尽量使用 antd 内置，其它使用 iconfont 上图标

## 部署

```shell
git pull origin master #拉取最新master
npm run build # TODO需要区分正式打包和测试打包sh上传已做
git checkout deploy #切换到deploy分支发布
npm run deploy publish # npm run deploy test # 正式上传和测试上传
```

## 服务器

目前前端资源部署服务器: `47.108.200.242`

可通过 ssh 链接:

```sh
# 需要配置过公钥才可以登录
ssh root@47.108.200.242
```
