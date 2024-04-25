# 服务安装

majora支持三种安装方式，分别兼顾快速上手、扩展定制、性能优化等不同场景

## 从docker安装

```shell
# 安装docker
yum install -y docker
# 下载镜像: 
docker pull registry.cn-beijing.aliyuncs.com/iinti/common:majora-allInOne-latest
# 启动majora服务器
docker run -d -p 5876:5876 -p 5879:5879  -p 30000-30200:30000-30200 registry.cn-beijing.aliyuncs.com/iinti/common:majora-allInOne-latest
```

这是最快速安装的方法，只需要一句docker命令即可启动majora

### 优缺点
docker一键安装的方式不需要配置环境，只需要你的Linux服务器存在docker环境既可一键拉起。

他的缺点就是稳定性稍微差一点儿，如下：

- majora存在两个进程：mysql数据库 + java的服务，正常情况下最佳实践上一个docker镜像仅关联一个确定的进程，否则进程crash docker容器无法感知。
- 无法完成分布式扩容，由于是all in one的方式启动，docker一键启动方式数据库被隐藏到内部，无法部署多个节点，并且让节点共享数据库。

当然实际上我认为单一服务器本身已经足够支持高的并发压力了，我认为单一docker节点也足够正常使用了。

## 使用docker compose

Docker依赖mysql，故需要docker-compose配合

### docker-compose
**已经安装过docker和docker-compose的请略过此步骤**
```shell
# 如果你的服务器长期没有更新，那么建议更新一下
sudo yum clean all
sudo yum makecache
sudo yum update

# 安装docker(系统依赖升级到最新，这里一般不会报错，如果报错请走一遍第一步，可以考虑使用阿里云的yum镜像)
sudo yum install -y yum-utils  device-mapper-persistent-data  lvm2
sudo yum-config-manager  --add-repo   https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io

# 设置docker开机自启动
sudo systemctl start docker 
sudo systemctl enable docker
systemctl enable docker.service
systemctl start docker.service

# 安装docker-compose，这里使用了pip的方式
sudo pip install docker-compose
```

### 启动majora
执行命令:
```shell
curl https://oss.iinti.cn/majora/quickstart.sh | bash
```

- 请预先安装好``docker``、``docker-compose``
- 服务依赖MySQL启动，使用Docker-compose 首次启动数据库较慢，
- 可能会majora-server启动失败， 这种情况确认数据库启动成功后，直接docker restart majora-server
- docker全部使用默认参数做配置，非常适合快速入门，当然majora目前没有非常复杂的环境依赖，使用docker用作生产也是可以的

```
yint@MacBook-Pro ~ % curl https://oss.iinti.cn/majora/quickstart.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   271  100   271    0     0   4113      0 --:--:-- --:--:-- --:--:--  4442
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2594  100  2594    0     0  48584      0 --:--:-- --:--:-- --:--:-- 52938
Archive:  majora-compose.zip
   creating: assets/
  inflating: assets/ddl.sql          
  inflating: docker-compose.yaml     
[+] Running 12/12
 ⠿ majora-mysql-local Pulled                                                                                                                                                                                                                                            40.1s
   ⠿ 9815334b7810 Pull complete                                                                                                                                                                                                                                         17.0s
   ⠿ f85cb6fccbfd Pull complete                                                                                                                                                                                                                                         17.1s
   ⠿ b63612353671 Pull complete                                                                                                                                                                                                                                         17.2s
   ⠿ 447901201612 Pull complete                                                                                                                                                                                                                                         17.4s
   ⠿ 9b6bc806cc29 Pull complete                                                                                                                                                                                                                                         17.4s
   ⠿ 24ec1f4b3b0d Pull complete                                                                                                                                                                                                                                         17.5s
   ⠿ 207ed1eb2fd4 Pull complete                                                                                                                                                                                                                                         21.6s
   ⠿ 27cbde3edd97 Pull complete                                                                                                                                                                                                                                         21.7s
   ⠿ 0a5aa35cc154 Pull complete                                                                                                                                                                                                                                         38.4s
   ⠿ e6c92bf6471b Pull complete                                                                                                                                                                                                                                         38.4s
   ⠿ 07b80de0d1af Pull complete                                                                                                                                                                                                                                         38.5s
[+] Running 3/2
 ⠿ Network majora_compose_default  Created                                                                                                                                                                                                                               0.0s
 ⠿ Container majora-mysql-local    Created                                                                                                                                                                                                                               0.3s
 ⠿ Container majora-server         Created                                                                                                                                                                                                                               0.0s
Attaching to majora-mysql-local, majora-server
...
majora-server       | 
majora-server       |   .   ____          _            __ _ _
majora-server       |  /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
majora-server       | ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
majora-server       |  \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
majora-server       |   '  |____| .__|_| |_|_| |_\__, | / / / /
majora-server       |  =========|_|==============|___/=/_/_/_/
majora-server       |  :: Spring Boot ::                (v2.4.0)
majora-server       | 
majora-server       |  _ _   |_  _ _|_. ___ _ |    _ 
majora-server       | | | |\/|_)(_| | |_\  |_)||_|_\ 
majora-server       |      /               |         
majora-server       |                         3.1.2 
```


### 升级服务器
```
cd majora-compose;
sudo docker pull registry.cn-beijing.aliyuncs.com/iinti/common:majoraserver-latest;
sudo docker-compose down;
sudo docker-compose up -d;
```

### 优缺点
使用docker-compose的方式，我们将majora的主服务器和mysql服务器拆分为两个镜像，这样无论是mysql还是majora出现问题，都可以被docker感知到。

同时如果你具备一定的运维能力，你可以将majora服务器横向扩充为多台节点，这样我们可以支持分布式的部署majora服务器集群。


##  手动部署

Majora使用java开发，并且使用mysql作为数据库,如果你想手动部署Majora，则需要手动完全java和mysql的安装，之后进行相关配置

### 安装准备
- [下载安装包](https://oss.iinti.cn/majora/MajoraV2Main.zip)
- 安装jdk1.8+
- 安装mysql，或者购买mysql服务

### 配置和初始化
- 解压安装包
- 数据库配置初始化配置在:``assets/ddl.sql``,请根据本sql文件进行数据库建表初始化
- conf文件夹的相关配置
  - 项目使用springboot，其中项目可选配置在 ``conf/application.properties``，请在这里配置您的数据库链接信息（数据库为您上一步完成的mysql安装和数据库配置）
  - ``conf/static/*``为前端资源，如果你想替换前端网页皮肤，则可以替换这里的内容 **majora前端是开源的，支持二开的**
  - ``conf/static/majora-doc/*``为文档资源，如果你想修改文档内容，则可以编辑这里

### 运行
- 执行``bin/startup.sh`` (如果是windows，那么执行 xxx.bat即可)
- 观察日志是否正常

## 安装后服务初始化设置

访问网站： [http://你的IP:Web服务端口](http://你的IP:Web服务端口) 如(http://127.0.0.1:5876/),首次打开网站请注册账户，第一个注册账户将会成为管理员
注册完成后记得设置”代理鉴权账号密码“, 如 admin/admin


###  安装App 连接 majora
- [majora APK客户端：4G IP](../04_client/01_android_app.md)
- [vps or 路由器](../04_client/02_pc.md)

### 测试代理链接
```sh
curl -vvv -x admin:admin@你的IP:30100 https://myip.ipip.net
```

日志输出
```text

* [CONN-0-0][CF-SSL] TLSv1.3 (IN), TLS handshake, Server hello (2):
* [CONN-0-0][CF-SSL] TLSv1.2 (IN), TLS handshake, Certificate (11):
* [CONN-0-0][CF-SSL] TLSv1.2 (IN), TLS handshake, Server key exchange (12):
* [CONN-0-0][CF-SSL] TLSv1.2 (IN), TLS handshake, Server finished (14):
* [CONN-0-0][CF-SSL] TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
* [CONN-0-0][CF-SSL] TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
* [CONN-0-0][CF-SSL] TLSv1.2 (OUT), TLS handshake, Finished (20):
* [CONN-0-0][CF-SSL] TLSv1.2 (IN), TLS handshake, Finished (20):
* SSL connection using TLSv1.2 / ECDHE-ECDSA-AES256-GCM-SHA384
* ALPN: server accepted http/1.1
* Server certificate:
*  subject: CN=*.ipip.net
*  start date: Apr  5 00:00:00 2023 GMT
*  expire date: Aug 24 23:59:59 2023 GMT
*  subjectAltName: host "myip.ipip.net" matched cert's "*.ipip.net"
*  issuer: C=CN; O=TrustAsia Technologies, Inc.; OU=Domain Validated SSL; CN=TrustAsia TLS ECC CA
*  SSL certificate verify ok.
> GET / HTTP/1.1
> Host: myip.ipip.net
> User-Agent: curl/7.87.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Fri, 05 May 2023 10:12:48 GMT
< Content-Type: text/plain; charset=utf-8
< Content-Length: 69
< Connection: keep-alive
< X-Cache: BYPASS
< X-Request-Id: b98493b30524c459d50edd7d2e98344c
< Server: WAF
< Connection: close
< Accept-Ranges: bytes
<
当前 IP：xxx.xxx.xx.xxx  来自于：中国 安徽 黄山  电信
* Closing connection 0
* [CONN-0-0][CF-SSL] TLSv1.2 (OUT), TLS alert, close notify (256):
```
