---
title: Introduction to the Majora3 Proxy Network Platform
description: Key concepts, personas, and capabilities behind Majora3 proxy IP pool orchestration.
updated: 2025-05-11
---

## Core ideas

Majora centralises proxy IP pool orchestration. Deploy a single server, install endpoints across your devices, and the platform stitches together a managed proxy network.

- **Vendors** combine VPS, broadband dial-up, and ADSL resources into a unified pool ready for resale.
- **Data teams** build tightly controlled pools for e-commerce or trading scenarios that demand stable IP identities.
- **Mobile 4G pools** convert Android phones or SBCs into unique mobile endpoints via our hardened client.
- **Secondary exports** wrap an existing pool (even behind NAT) through the exporter module into Majora.
- **Home IP** scenarios leverage diverse CPE/Router clients for residential footprints.

The following sections outline five essential pillars: IP pool models, endpoints, rebinding, permissions, and performance.

## IP pool models

Majora ships with five pool strategies; each exposes multiple ports that represent complete proxy servers.

- **Random**: dispatches each request to a random healthy node—ideal for stateless crawling.
- **Static**: binds every port to a fixed node and keeps IP identities long-lived.
- **Consistent**: consistent hashing remaps ports when nodes churn, balancing continuity with availability.
- **City**: maps ports to cities; the same user hitting the same port retains both city and node affinity while new users are load-balanced.
- **Instructional**: leverages username parameters to route dynamically by country, city, geo and beyond.

## Endpoints

Endpoints (clients) are the actual egress devices. Connecting them only requires reachability to the control plane; topology is irrelevant.

- Minimal bootstrap—just point the client at the server.
- Supports Linux, Windows, macOS, OpenWrt and other router environments.
- Includes Android app integrations and high-throughput Java agents for secondary pools.
- Built-in NAT traversal enables usage in private networks.

## Rebinding

Many providers can cycle to fresh IPs by redialing. Majora captures this capability to expand pool capacity.

- ADSL PCs, rebind-capable VPS, and phones toggling flight mode can all refresh addresses.
- The **Rebind Plan** module schedules dial events, scopes target devices, and records outcomes plus IP deltas.

## Permissions & safety

Majora3 introduces granular control.

- **Dual-account model** separates console credentials from proxy credentials to prevent lateral exposure.
- **Resource visibility** ensures customers only see authorised pools, logs, and metrics.
- **ACL policies** block destinations per user or globally for compliance.

## Performance & observability

- Event-driven pipeline handles 200 Mbps and massive endpoints without CPU/memory spikes.
- Zero-lock proxy forwarding and registration eliminate contention.
- Off-heap memory with streaming transfer reduces GC pressure and latency.
- Extensive telemetry covers traffic, destinations, node latency, rebind events, and timeline traces.
- Live configuration updates (accounts, whitelists, pools, ACLs, schedules) take effect immediately; node churn is detected within milliseconds.

Understanding these concepts accelerates deployment and scaling of enterprise-grade Majora proxy networks.
