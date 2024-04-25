# 快速上手

## 服务部署

以 centos 为例

- 安装 docker: `yum install -y docker`
- 下载镜像: `docker pull registry.cn-beijing.aliyuncs.com/iinti/common:majora-allInOne-latest`
- 启动 majora 服务器: `docker run -d -v ~/majora-mysql-data:/var/lib/mysql  -p 5876:5876 -p 5879:5879 -p 30000-30200:30000-30200 registry.cn-beijing.aliyuncs.com/iinti/common:majora-allInOne-latest`

## 终端链接

### Android 手机

- (app)安装 apk：`https://oss.iinti.cn/majora/majora-client-android.apk`
- (app)修改服务器：<br><img src="./04_client/imgs/adr/2022-09-19-23-40-58-26.jpg" width="300" height="550" align="middle" />

### pc 电脑

todo

## 测试代理资源池

使用 Linux curl 命令测试代理

` curl -x majora:majora@majora.iinti.cn:30002 https://www.baidu.com/`

## 快速入门视频教程

[majora-quickstart.mp4](https://oss.iinti.cn/majora/majora-quickstart.mp4)
