# 开发者

majora是一个商业化项目，但是我们提供了极度开放的二次开发定制许可，majora的皮肤、app、sdk等组建均是开源的，用户可以自行根据自己的需要来编译替换他。

## 源码仓库列表

* majora中心服务器： [https://github.com/yint-tech/majora-server-v2](https://github.com/yint-tech/majora-server-v2) (
  注意，闭源工程，仅限购买源码用户可访问)
    * 服务端代码
    * 文档系统（doc）
    * sdk定义（你也可以在jar包仓库中看到sdk内容）
* 前端页面：[https://github.com/yint-tech/majora-server-v2-frontend](https://github.com/yint-tech/majora-server-v2-frontend) react+mui实现
* Android客户端: [https://github.com/yint-tech/majora-adr](https://github.com/yint-tech/majora-adr)
    * 使用标准sdk实现
    * 用作4G流量发生器的独立app
    * 集成sdk到其他app中的标准参考demo
* go客户端：[https://github.com/yint-tech/majora-go](https://github.com/yint-tech/majora-go)
    * 适用于路由器代理池资源收集
    * 适用于VPS代理池建设
    * 跨语言二进制协议客户端实现的标准参考

## sdk
除开完整的多平台客户端，我们还提供编程使用的SDK，这样大家可以在自己的公司业务范围内更加方便的完成majora功能集成。（比如将sdk集成到公司自有app中等）。

- 对于Android，你可以使用javaSDK无缝集成
- 对于IOS，请自行移植go源码仓库
- 对于Linux和window等主机场景，请直接使用二进制文件

## JavaSDK
java提供的是maven仓库依赖，这样你可以通过maven或者gradle对他进行api坐标引用，方式分别如下：
### gradle:
```
maven {
	name "IntMaven"
	url "https://nexus.iinti.cn/repository/maven-public/"
 }

dependencies {
	implementation "cn.iinti.majora:majora-sdk:1.4"
}
```
### maven:
```
<repository>
        <id>int-public</id>
        <name>int public maven</name>
        <url>https://nexus.iinti.cn/repository/maven-public/</url>
        <releases>
           <enabled>true</enabled>
        </releases>
        <snapshots>
           <enabled>false</enabled>
        </snapshots>
</repository>

<dependency>
        <groupId>cn.iinti.majora</groupId>
        <artifactId>majora-sdk</artifactId>
        <version>1.4</version>
</dependency>
```
### demo
```
 private static void startProxyService() {
        // 获取服务器，账户等配置
        SharedPreferences spf = PreferenceManager.getDefaultSharedPreferences(TheApp.getApplication());
        String serverHost = spf.getString("server_host", "majora.iinti.cn");
        int serverPort = CommonUtils.toInt(spf.getString("server_port", "5879"), 5879);
        // 启动Majora客户端
        majoraClient = new MajoraClient(serverHost, serverPort, ClientIdentifier.id());
        //绑定Majora对账账户（可以为空）
        majoraClient.setDeviceAccount(spf.getString("account_identifier", ""));
        // 重新设置日志处理器，使得app可以显示Majora运行日志
        UILoggerHelper.setupLogger();
 }
```
以上代码地址见：

[https://github.com/yint-tech/majora-adr/blob/master/app/src/main/java/cn/iinti/majora/adr/majora/MajoraClientService.java](https://github.com/yint-tech/majora-adr/blob/master/app/src/main/java/cn/iinti/majora/adr/majora/MajoraClientService.java)
