---
title: Quick start
description: Deploy the Majora all-in-one image and sign in with the demo account in minutes.
updated: 2024-06-01
---

## Prerequisites

Spin up a Linux host with public network access and install Docker (and optionally Docker Compose 1.29+).

```bash
yum install -y docker
systemctl enable docker --now
```

## Full deployment commands

Copy the following snippet into your shell to download the image and launch the container:

```bash
yum install -y docker
docker pull registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
docker run -d --network host \
  -v ~/majora3-mysql-data:/var/lib/mysql \
  --name majora3 \
  registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
```

## Pull the image

Fetch the official all-in-one package which bundles the control plane and MySQL.

```bash
docker pull registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
```

## Run the container

Launch the stack in host networking mode and persist databases to `~/majora3-mysql-data`.

```bash
docker run -d --network host \
  -v ~/majora3-mysql-data:/var/lib/mysql \
  --name majora3 \
  registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
```

Once the container is healthy, open [http://majora3.iinti.cn/](http://majora3.iinti.cn/) to access the console.

## First login

- Username: `majora`
- Password: `majora`

After signing in you can inspect default endpoints, usage quotas, and API keys. Change the password right away for security.

## Next steps

Continue with the "Client setup" guide to bring online the endpoints that will contribute proxy IP capacity.
