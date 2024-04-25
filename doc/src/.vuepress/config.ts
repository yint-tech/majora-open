import {defineUserConfig} from 'vuepress'
import {head} from "./configs";
import theme from "./theme.js";

export default defineUserConfig({
    base: "/majora-doc/",
    head,
    lang: 'zh-CN',
    title: 'majora',
    description: '代理IP池集群建设系统',
    theme
})