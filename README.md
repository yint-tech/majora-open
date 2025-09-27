# Majora3 Proxy Service Cluster

> [中文文档 / Chinese Guide](README.zh-CN.md)

Majora3 is the next-generation proxy cluster platform from Yint Tech. It helps enterprises build large-scale, compliant, and monitorable IP services on their owned or hosted network endpoints. The platform delivers a full set of capabilities including control plane management, endpoint onboarding, metering and billing, and redial governance. It is ideal for risk control, advertising operations, cross-border e-commerce, data collection, and more.

## Key Advantages

- **One-click deployment**: The all-in-one image bundles the control plane and database, bringing the environment online within minutes.
- **Broad endpoint coverage**: Unified support for Linux servers, Windows hosts, Android devices, routers, and more.
- **Flexible IP pool strategies**: Built-in Random, Static, Consistent, and City distribution modes that balance stability, geography, and routing control.
- **Visual operations**: Tenant management, statistics dashboards, node health monitoring, and traffic alerts out of the box.
- **Security and compliance**: Role hierarchies, ACL audits, event alerts, and risk tooling such as exit redial and airplane mode.

## Platform Capabilities Overview

| Capability Area | Description |
| --- | --- |
| Control Plane | Web console + API for endpoint management, account system, order billing, and notifications |
| Endpoint Access | Host/Client dual modes with batch deployment scripts, auto registration, and in-place upgrades |
| Traffic Scheduling | Multi-layer policy routing with HTTP, HTTPS, and SOCKS5 protocol support |
| Observability | Real-time status, bandwidth, success rate metrics with dashboards and log export |
| Elastic Governance | Redial plans, rate limits, allow/deny lists, and session persistence policies |

## Logical Architecture

1. **Control Center**: Manages users, nodes, and policies while exposing APIs. Deploy in data centers or cloud environments.
2. **Proxy Nodes**: Run on corporate endpoints or cloud servers to forward traffic and report telemetry.
3. **Client SDK / API**: Business systems connect via standard protocols or APIs to obtain policy-compliant proxies.
4. **Monitoring & Alerts**: Collect end-to-end metrics and notify operations or business teams through alert channels.

## Quick Trial

```bash
yum install -y docker && \
docker pull registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one && \
docker run -d --network host \
  -v ~/majora3-mysql-data:/var/lib/mysql \
  --name majora3 \
  registry.cn-beijing.aliyuncs.com/iinti/majora3:all-in-one
```

- Access the management console in your browser: `http://127.0.0.1:6879`
- Default trial credentials: `majora / majora`
- The first self-registered user automatically receives administrator privileges

## Supported Endpoints & Access Methods

- **VPS / Cloud servers**: Linux client provides batch deployment scripts for large-scale node operations.
- **Residential / Enterprise broadband**: Rapid integration with OpenWrt-style routers to expand compliant egress resources.
- **Android devices**: Stable onboarding for 4G/5G devices with scheduled redial and traffic reporting.
- **In-house applications**: Integrate via SDK or API to embed proxy capabilities into internal systems.

## Typical Use Cases

- Batch operations for overseas advertising or e-commerce accounts
- Cross-region content delivery and risk verification
- Data gathering and sentiment monitoring projects
- Offensive and defensive security testing

## Related Products

- **Malenia Proxy IP Gateway**: Enterprise-grade proxy management center supporting sophisticated billing and routing policies.
- **Sekiro Distributed Service Platform**: Multi-language, cross-topology service orchestration toolkit.

## Business & Partnerships

- Business cooperation: Add WeChat `iinti_cn` to join the community
- Official website: [https://iinti.cn/en-us/](https://iinti.cn/en-us/)
- Documentation center: <https://majora3.iinti.cn/majora-doc/>
- GitHub repository: <https://github.com/yint-tech/majora-open>

For enterprise trials or custom features, reach out through the above channels.
