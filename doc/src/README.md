---
home: true
title: Majora-代理IP池建设系统
icon: fa6-solid:house
heroImage: /images/logo.png
actions:
- text: 开始使用
  link: /01_user_manual/01_quick_start
  type: primary
- text: 高阶深入
  link: /02_advance/
  type: secondary


features:
- title: 使用简单
  icon: fa6-solid:hand-middle-finger
  details: 一键完成代理服务搭建，任意网络设备运行即加入代理ip服务，不需要复杂的组网络、网络拓扑配置、终端配置等。内嵌内网穿透，无论您的网络设备身在何处，只要可以上网即可提供代理IP资源
- title: 多种网络终端
  icon: fa6-solid:network-wired
  details: 支持pc（Windows、Linux、macOS），支持Android手机，支持路由器等网络设备，支持API集成到各种应用软件中
- title: 管理和控制
  icon: fa6-solid:life-ring
  details: 统一的后台系统、多用户体系、报表和用量控制、设备监控、设备状态查看、远程重播和控制、供应端和消费端计量等
- title: 可靠和性能
  icon: fa6-solid:battery-full
  details:  支持完整的http/https/socks5代理协议，支内存毫秒级别的失败隧道路由切换、异步NIO和内存复用，实现海量高吞吐带宽数据转发（已验证单台服务器200M带宽无性能问题）。
---
<div id="docNotice"></div>

### 简单4步完成安装

```bash
# 服务器： 安装docker
yum install -y docker
# 服务器： 下载镜像: 
docker pull registry.cn-beijing.aliyuncs.com/iinti/common:majora-allInOne-latest
# 服务器：启动majora服务器
docker run -d -p 5876:5876 -p 5879:5879  -p 30000-30200:30000-30200 registry.cn-beijing.aliyuncs.com/iinti/common:majora-allInOne-latest

# 安装和配置app（app为例）
https://oss.iinti.cn/majora/majora-client-android.apk

# 使用手机app的网络提供代理能力
curl -x majora:arojam2021@majora.iinti.cn:30002 https://www.baidu.com/
```