#!/usr/bin/env bash

# 任意命令出错时终止运行
set -e

RED="\033[0;31m"
YELLOW="\033[1;33m"
GREEN="\033[0;32m"
RESET="\033[0m"

now=$(date +%s)
base=$( cd "$(dirname "$0" /../)" ; pwd -P )

echo "开始远程部署"
ENV_TYPE=$1
if [ "$ENV_TYPE" = "publish" ]; then
  echo "环境为: publish"
elif [ "$ENV_TYPE" = "test" ]; then
  echo "环境为: test"
else
  echo "未指定环境或不支持的环境 $ENV_TYPE, 目前支持的环境有:\n\tpublish\n\ttest\n"
  exit 1
fi

echo "打包dist"

rm -rf $base/deploy/$ENV_TYPE
mkdir -p $base/deploy/$ENV_TYPE

tar -zcvf $base/deploy/$ENV_TYPE/$now.tar.gz -C $base/dist .
echo "打包完成: $base/deploy/$ENV_TYPE/$now.tar.gz"

echo "需要进行远程部署吗? (Y/n)"
read answer
if [ "$answer" != "" ] && [ "$answer" != "Y" ] && [ "$answer" != "y" ] ;then
  echo "本地打包完成!"
  exit 0
fi

echo "进行远程部署"
server_host="root@47.108.200.242"
server_port=22
server_dist="/usr/local/nginx/html"
project_name="smart-sanitation"
if [ "$ENV_TYPE" = "test" ]; then
  project_name="smart-sanitation-test"
fi
echo $server_port $base/deploy/$ENV_TYPE/$now.tar.gz $server_host:$server_dist/$project_name/

# 指定当前目录 请保证处于此项目根目录
ssh -p $server_port $server_host "mkdir -p $server_dist/$project_name/"

echo "[$ENV_TYPE] 上传资源"
scp -P $server_port $base/deploy/$ENV_TYPE/$now.tar.gz $server_host:$server_dist/$project_name/

echo "[$ENV_TYPE] 上传资源成功, 开始部署"
ssh -p $server_port $server_host "tar -xzf $server_dist/$project_name/$now.tar.gz -C $server_dist/$project_name"

rm -rf $base/deploy/$ENV_TYPE
echo "部署成功!"