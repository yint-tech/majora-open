# 部署高阶

## 文件结构
majora使用java编写，服务器使用springboot，发布产物为如下结构的压缩文件夹，在majora运行时将会产生额外的运行时文件，如日志、授权、版本状态等。

程序从``bin/``中启动脚本开始，他会探测java的存在，并且配置好java运行相关环境，启动springboot的主程序。

### 资产
- 使用``ddl.sql``文件进行mysql数据库建表，数据库的设计在本文件定义
- majora的代码经过混淆和加密，故正常日志中如果出现bug抛出堆栈异常，则无法根据报错信息定位代码，此时应该将``proguard.map``提交给官方进行解密，如此还原代码报错信息

### 启动脚本
无论在windows还是Linux，系统均从脚本启动，他运行的是一个java程序，请注意脚本本身不提供后台运行能力，脚本停止程序即停止。
由于大部分情况我们都是在Linux环境下运行，所以``startup.sh``则是一个Linux上面方便的脚本，他可以探测原有进程，进行杀死重启。

### conf
大量的可以被编辑和修改的内容在这里，包括如下几类

- 应用程序配置：application.properties，这是springboot的启动配置文件，了解springboot的同学应该知道他可以影响整个web服务器很多内容。当然目前我们只需要关心：web站点端口、数据库链接地址
- auth：因体授权模块，majora系统是一个收费系统，其中用户的使用权限依靠auth模块来执行。这里包含授权相关运行环境和授权相关日志
- _build_config.properties：代码编译构建相关环境变量，为了追踪majora代码编译和构建过程，方便用户定位由版本带来的故障，
- static： 前端资产，所有的前端相关的静态资源，放置到这里的资源，可以没有任何权限拦截的方式被映射到web服务器中。
  - 根据majora开源的前端代码，用户可以自行编译新的前端页面，实现majora皮肤定制
  - majora-doc：文档系统最终也是编译为静态的资源，他被放置在这里
- lib：java的依赖库和majora的java代码编译产物
- logs：majora的运行日志，如果majora运行发生了异常，可以在这里观察日志

```
.
├── assets                                  资产相关
│   ├── ddl.sql                         数据库建表sql
│   └── proguard.map                    混淆代码对照表（加密）
├── bin                                     程序脚本
│   ├── MajoraV2Main.bat                windows平台启动脚本
│   ├── MajoraV2Main.sh                 Linux平台启动脚本
│   └── startup.sh                      Linux平台自动重启脚本
├── conf                                    软件配置
│   ├── application.properties          web服务器配置（springboot服务器）
│   ├── auth                            因体授权相关
│   │   ├── auth.log.txt            授权模块相关日志
│   │   ├── int_auth.id.txt         授权实体：即服务安装的唯一id
│   │   └── int_auth.key            授权ticket：即从授权中心服务拉去的授权凭证
│   ├── _build_config.properties        代码编译构建相关环境变量
│   ├── static                          前端资源产物：即react前端工程构建的静态html/js文件
│   │   ├── asset-manifest.json
│   │   ├── favicon.ico
│   │   ├── images
│   │   ├── index.html
│   │   ├── majora-doc              文档产物：即使用vuepress构建的文档站点
│   │   ├── manifest.json
│   │   ├── precache-manifest.14d9a0d0772d72da7205aebf72c13903.js
│   │   ├── _redirects
│   │   ├── service-worker.js
│   │   └── static
│   └── versionCode.txt     
├── lib                                     java的依赖库：包括majora自身的核心代码
│   ├── aliyun-java-sdk-core-4.5.10.jar
│   ├── aliyun-sdk-oss-3.14.0.jar
│   ├── aspectjweaver-1.9.6.jar
│   ├── aws-java-sdk-core-1.12.196.jar
│   ├── aws-java-sdk-s3-1.12.196.jar
│   ├── bcpkix-jdk15on-1.55.jar
│   ├── bcprov-jdk15on-1.55.jar
│   ├── byte-buddy-1.10.18.jar
│   ├── checker-qual-3.12.0.jar
│   └── ...
└── logs                                    软件运行日志
    ├── majora                                  业务日志
    │   ├── errors                           异常归档
    │   ├── majora-error.log                 异常  
    │   ├── majora-service.log               常规日志
    │   ├── metric                           监控系统相关日志
    │   ├── service                          常规日志归档
    │   └── traces                           网络程序日志：终端设备/代理转发/代理协议识别等
    └── std.log                                  控制台
```

## 分布式部署
首先我认为majora的性能足够高，基本不会说需要通过分布式的方式来提高系统吞吐能力。直接增加服务器的配置将会比部署多个服务器节点更加可靠。

但是如果我们系统提供一个具备高可用的服务（即HA备份），则可以考虑部署多台majora节点。 majora的分布式部署很简单，

- 在多台服务器上，使用同一个mysql数据库实例进行安装（则保证了网站的用户、配置等内容的一致性）
- 多台服务器的网络可以互通，即在web端口上，多台服务器的节点可以相互访问，如此实现配置变更的通知和push

### 使用docker进行分布式部署

如果使用docker，则同样是这样的拓扑结构，即1+n的方法（1台mysql中心，N个majora节点），此时需要用户了解docker-compose的用法，
即改造docker-compose的定义，拆分mysql和majora，保证只拉起一份mysql，以及拉起多分majora节点。

**请注意，docker all-in-one的方式无法实现分布式，因为此时mysql和majora合并到同一个镜像中，并且mysql只存在镜像内部，并没有对外公开**


### 客户端的分布式链接
客户端系统了同时连接多台majora服务器的API，你有如下两种方式实现客户端HA多个majora节点

- 使用域名的方式：即为majora服务器绑定域名，此时一个域名可以绑定多台majora的节点ip，majora客户端将会自行完成节点的多个ip的解析：此方式可以通过调整dns的方式弹性修改majora服务器列表
- 使用ip列表的方式，直接传入多个ip： 此种方式相对来说比较直观和简单，

## docker
为减少客户的服务部署难度，特别是非java语言派系的同学的难度，我们非常倾向用户使用docker来完成majora服务部署。此时需要用户了解一些docker的基本概念。

### 容器
可以理解为docker就是一个预装好了majora软件的Linux安装包，只要安装了系统就会自然的完成软件的配置，如此即可一键启动系统（完成从Linux系统安装、系统设置、软件安装升级、软件配置、启动软件等一系列操作）

故docker就是一个Linux的虚拟机环境，此时应用程序认为他在一个完整的Linux系统中，但是毫无疑问他所看到的磁盘、网络端口、进程空间等资源都是虚拟的，被主机隔离的。

### 映射
由于我们始终需要通过主机环境和互联网完成真正的通信，所以存在容器内部资源到主机环境的映射。

- 端口映射：容器内部开启的端口，需要被映射到主机才能让互联网真正访问到： 我们使用``-p``命令进行映射配置：
  - ``-p 80:5876``：将主机的80端口和容器内部的5876进行映射绑定；
  - ``-p 30000-30200:30000-30200``：将注意环境中的30000到30200的201个端口，一一和容器环境中的30000到30200的201个端口进行映射绑定
- 磁盘映射： docker中的文件，一旦重启容器则会被销毁，故如果希望实现数据可以持久化，则必须实现文件磁盘的映射，数据将保留在外部主机而非容器中的临时磁盘中
  - mysql：所有的网站操作数据都存储在mysql中，所以mysql必须配置文件映射：``~/majora-mysql-data:/var/lib/mysql``
  - 授权文件：因体授权文件作为本系统具备的授权控制系统，需要被持久化保存，否则系统重启需要重新联系我们进行授权配置：``~/majora-iinti-auth:/opt/majora/conf/auth``
  - 日志（可选）：如果你希望在容器外部查看日志，则可以考虑将日志挂出
