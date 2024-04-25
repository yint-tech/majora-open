# 场景

majora从开发至今应对过很的客户需求，但是不是所有客户都需要这些偏定制化的功能，所以这里我根据不同的业务场景，梳理这些场景应该如何配置。

## 出口IP映射

majora的ip为隧道代理模式，并且提供多个端口隔离隧道资源，如此实现不同端口走不同的ip资源，实现ip出口可变+不可变（即用户更换端口即更换出口ip，不更换端口则出口ip不变，此时ip出口选择受到用户需求而控制）

### 完全随机出口IP
用户可能不需要这种"聪明"的ip选择方式，而是单纯的希望每次完全随机的选择出口，即完全的随机隧道。

在超管的设置模块，配置随机隧道端口，并且使用本端口作为代理ip服务器，即可满足需求

![随机隧道](./imgs/random_turing.png)

### 完全固定的出口IP
一致性哈希场景下，使用代理ip资源的时候并不能非常明确的确定出口ip资源（虽然可以通过API查询映射关系，但是关系可能在发送代理请求的过程又发生变更了），
而用户可能就是希望明确的使用某个网络设备的出口资源。即实现静态的长效IP能力。

此时，在后台为终端设备绑定一个固定的端口资源，然后使用本端口发送代理请求，则会永远使用这个设备进行网络代理。

![绑定端口](./imgs/binding_port.png)

- 自动填充静态绑定： 上述端口绑定过程是后台人工操作，但是终端设备可能随着业务在弹性的伸缩，故可能业务需要自动完成绑定关系填充
  - 使用majora的接口API
  - 配置静态绑定端口范围，此时系统将会自动分配空闲的端口资源，当一个新终端连接时，为他创建对应的静态绑定。
- 查询绑定关系：当静态绑定关系入库之后，即可通过MajoraAPI进行数据查询，此时由业务来确定如何使用这些端口资源即可

## 子池划分
Majora是一个ip池系统，正常我们认为Majora是一个全局的公共池，即所有的设备连接到Majora则被任何的majora无差别的访问。此时假定我们需要做终端设备的隔离，
这种隔离可能是业务权限，也可能是业务特性。如不同部门的资产隔离，来自不同国家的终端设备属性隔离等。

majora提供了一种简单的子池划分功能，即：对账用户子池

majora终端设备在进行网络注册的时候，可以指定对账用户，一旦终端指定了本字段，则majora系统将会自动为这个账户创建一个子IP池，
此时对账用户和majora后台用户如果相同，则他们将会存在子ip池关联关系，即可以约定改后台账户对应的代理访问，将会规约在其关联子ip池中。

然而此行为有如下例外：

- 用户需要在其个人设置中，开启用户子池功能
- 此特性仅正对于一致性哈希绑定场景，对于静态绑定和随机隧道方式不适用

![用户子池开关](./imgs/child_pool_switch.png)

## 循环填充白名单
此功能给无法使用账号密码进行鉴权的场景使用，首先majora的代理服务必须鉴权，鉴权方式支持账号密码和白名单两种。

当我们的业务场景无法使用账号密码鉴权，而必须使用白名单鉴权时，可能出现一个业务状况：白名单鉴权根据访问代理ip资源的的机器的出口ip来识别请求，
然而这些机器的出口ip可能会发生缓慢的变化。如在程序运行在宽带网络之中、运行在手机4G流量之下。

由于无法静态确定出口ip，所以我们并不能提前在后台填写ip列表。所以majora提供的解决方案如下：

- majora提供了Http接口API，可以通过API动态添加白名单配置，业务可以定时的、循环的调用API，维护白名单列表
- 直接访问对应http接口即可，majora将会自动的解析来源ip（不需要手动访问ip解析网站获得出口ip）
- Http接口存在鉴权（即ApiToken），故不存在安全问题
- 为避免配置碰撞，majora使用LRU策略，在白名单配置达到容量的时候，删除最早添加的，且没有心跳的ip白名单配置。保证白名名单存储最近的、最新的内容
- 此方案可能在天级别内具备几分钟级别的服务不可用场景，但是整体基本满足需要。

## ssl over ssl
在使用https代理的时候，https底层是ssl，即代理报文经过了tls加密，majora并不干预这个加密过程，他只透传tls流量。

按照https代理的标准流程，存在https客户端到代理网站的流量+https客户端发送给最终的目标网站的加密流量。此时由于目标网站是https的，此流量必须加密。
然而https客户端到代理服务器（即majora服务器）的流量，我们一般认为他是明文的流量。

不过这是一般情况，按照http代理的标准流程，我们允许http客户端到majora代理服务器的流量进行tls加密，此时如果有中间人抓包则无法看到http客户端发送给majora的报文内容了，
这个场景我把它叫做``ssl over ssl``

大多数情况此种场景在python代码中容易出现，目前其他语言很少看到出现此种特性：

如代码：
### 普通的，和majora通信使用明文的方式
```python
import requests
proxies = {
    'http': "http://majora:majora@majora.iinti.cn:5879",
    'https': "http://majora:majora@majora.iinti.cn:5879" 

}
res = requests.get('https://www.baidu.com', timeout=11, proxies=proxies).text
print(res)
```
### SSLOverSSL，和majora通信使用tls加密的方式
```python
import requests
proxies = {
    'http': "https://majora:majora@majora.iinti.cn:5879",
    'https': "https://majora:majora@majora.iinti.cn:5879" 

}
res = requests.get('https://www.baidu.com', timeout=11, proxies=proxies).text
print(res)
```

支持ssl over ssl，则要求majora服务器具备https证书，你需要去ca机构申请证书（由于实在是太麻烦，而且基本没有业务收益，所以其实一般来说不建议用户搞这个），然后配置证书到majora中。

### 配置majora证书

- 申请ca证书，放置到majora所在服务器
- 如果使用docker，则需要为ca证书文件进行挂载映射，避免重启docker证书消失
- 配置``application.properties``
  - server.ssl.keyStore=证书文件地址 (如：ssl_key_store_file.pfx)
  - server.ssl.keyStoreType=证书类型 (如：PKCS12)
  - server.ssl.keyStorePassword=证书密码
- 重启majora系统，即可支持``"https://majora:majora@majora.iinti.cn:5879" ``

### 自动生成证书
如果你没有申请CA证书，但是依然希望使用ssl over ssl，则可以通过majora自动生成签名证书，此时majora作为根证书机构颁发任意网站证书，所以需要用户在自己的电脑上安装majora提供的根证书。
此种场景几乎不可能有需求，所以这里暂时不展开了。


## 重播
对于支持重播ip的终端设备（如VPS、完成root的Android设备等），则可以通过http API主动调用重播，点击如下API查看详情

[重播API](/swagger-ui.html#!/endpoint45controller/redialUsingGET)