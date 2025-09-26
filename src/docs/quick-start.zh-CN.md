---
title: 快速入门
description: 几分钟完成 Majora All-in-One 版本的部署与初始配置。
updated: 2024-06-01
---

## 环境准备

Majora 服务建议部署在具备公网访问能力的 Linux 服务器，系统需安装 Docker 及 Docker Compose 1.29+ 或更高版本。

```bash
yum install -y docker
systemctl enable docker --now
```

## 一键部署命令

直接将以下命令复制到终端，即可完成镜像拉取与容器启动：

```bash
yum install -y docker
docker pull registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
docker run -d --network host \
  -v ~/majora3-mysql-data:/var/lib/mysql \
  --name majora3 \
  registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
```

## 下载镜像

拉取官方的一体化镜像，其中包含核心控制面和内置 MySQL。

```bash
docker pull registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
```

## 启动容器

以下命令将容器运行在 Host 网络模式，并将数据库数据持久化在 `~/majora3-mysql-data` 目录。

```bash
docker run -d --network host \
  -v ~/majora3-mysql-data:/var/lib/mysql \
  --name majora3 \
  registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
```

容器启动后，浏览器访问 [http://majora3.iinti.cn/](http://majora3.iinti.cn/) 即可进入管理后台。

## 首次登录

- 账号：`majora`
- 密码：`majora`

登录后可以查看默认接入点、试用配额以及 API 密钥，并根据需要修改默认密码。

## 下一步

阅读「客户端部署」文档，选择合适的终端形态完成代理节点上线。
