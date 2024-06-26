# Majora

- [English](./readme.en.md)

Majora 是一套完整的代理 ip 建设集群方案，为代理 IP 池供应链系统，如果您拥有大批量的可以上网的网络设备（VPS 服务器、路由器设备、手机等移动设备），那么你可以使用这些网络设备方便的构建您的代理 IP 池。

## Majora 可以满足的应用场景如下：

- 您是代理 ip 供应商，拥有大量 VPS 节点，则你可以通过 Majora 快速搭建您的代理 IP 池
- 您可以将 Majora 终端程序刷入到路由器等网络设备中，则您可以通过 Majora 构建您的家庭 ip 资源池或者 ADSL IP 资源池
- 您可以安装 Majora 的 apk，或者使用 Majora 的 sdk 集成到手机程序中，则您可以通过 Majora 快速搭建您的手机出口 IP 资源池(如果您的手机有 root，那么还可以拥有定时重播的功能)

## Majora 功能特点

- 使用简单：所有终端节点都是一键安装即可接入代理 ip 集群，无需服务器复杂的参数配置
- 多供应商和采购商概念：您可以让多个持有网络设备的供应商同时接入 Majora 系统，同时可以让多个 ip 使用方接入 Majora 的 IP 资源。Majora 记录了每个供应者和消费者的详细账单流水，您可以根据流水对供应商和采购商进行费用结算
- 协议完整：本系统完整支持 http/https/socks5 代理协议，所有代理端口均自动识别代理协议。无需用户手动选择端口
- ip 质量可靠性：Majora 暴露端口范围，以隧道代理的方式提供服务。并提供内存级别的 IP 资源失败路由功能。除极少情况（被中断请求中的链接），Majora 保证供应端每个代理端口均可提供对等的稳定代理服务。永远不会出现代理链接不上，或者连接上无法使用的情况
- 多网络设备支持：支持服务器（VPS)、手机、路由器、PC(普通 windows 或者 mac 电脑)
- 高并发和高带宽：NIO 框架天然支持非常高的吞吐，且 Majora 的前序系统(Rogue)已经经过单节点百 M 的带宽压力

## 完整文档：

[http://majora.iinti.cn/majora-doc/index.html](http://majora.iinti.cn/majora-doc/index.html)

### 联系方式

商务：

![商务](https://oss.iinti.cn/majora/dwc.jpeg)
