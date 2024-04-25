import type {HeadConfig} from "@vuepress/core";

export const head: HeadConfig[] = [
    ["meta", {name: "application-name", content: "Majora-代理IP池集群建设方案"}],
    ["meta", {name: "apple-mobile-web-app-title", content: "Majora"}],
    ["meta", {name: "apple-mobile-web-app-status-bar-style", content: "black"}],
    ["meta", {name: "msapplication-TileColor", content: "#3eaf7c"}],
    ["meta", {name: "theme-color", content: "#3eaf7c"}],
    ["meta", {name: "keywords", content: "Majora,代理ip,代理IP池,ip池,抓取,4G代理,自建ip,vps代理IP,因体,virjar"}],
    ["meta", {name: "description", content: "majora-专业、全能的的ip池建设方案"}],
    [
        "script",
        {
            src: "/majora-doc/js/load_notice.js"
        }
    ]
];
