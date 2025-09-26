---
title: 安卓客户端部署
description: 在 Android 终端安装并接入 Majora 网络，提供移动代理能力。
updated: 2024-06-15
---

## 下载 APK

从官方对象存储获取最新的安卓安装包。

```text
https://oss.iinti.cn/majora3/Majora3.apk
```

## 安装与初始化

1. 将 APK 拷贝到目标设备，允许「未知来源」安装。
2. 首次打开应用时输入控制台地址 `majora3.iinti.cn`。
3. 使用测试账号 `majora/majora` 登录，系统会自动下发隧道配置。

## 运行模式

- **服务模式**：应用保持在前台运行，适合测试和调试。
- **常驻模式**：启用后台保活，设备待机也可持续提供代理通道。

## 验证出口

在任一终端执行以下命令验证代理链路是否正常。

```bash
curl -x majora:majora@majora.iinti.cn:30002 https://www.baidu.com/
```

若返回 HTML 内容，则说明移动设备已经成功对外提供代理能力。
