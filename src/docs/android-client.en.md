---
title: Android client setup
description: Turn an Android handset into a Majora proxy node.
updated: 2024-06-15
---

## Download the APK

Grab the latest installer from the official object storage bucket.

```text
https://oss.iinti.cn/majora3/Majora3.apk
```

## Install and bootstrap

1. Copy the APK to the device and allow installs from unknown sources.
2. Launch the app and enter the console endpoint `majora3.iinti.cn`.
3. Sign in with the demo account `majora/majora`; tunnel settings are provisioned automatically.

## Operating modes

- **Service mode** keeps the app foregrounded for testing and debugging.
- **Persistent mode** enables background keep-alive so the proxy stays available while idle.

## Validate the egress

Run the following command from any client to confirm the tunnel works end-to-end.

```bash
curl -x majora:majora@majora.iinti.cn:30002 https://www.baidu.com/
```

A successful HTML response means the Android device now serves proxy traffic.
