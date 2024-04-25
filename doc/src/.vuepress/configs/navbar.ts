import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {
        text: "用户手册",
        icon: "fa6-solid:book",
        prefix: "/01_user_manual/",
        children: [
            {
                text: "快速上手",
                link: "01_quick_start/",
            },
            {
                text: "概念说明",
                link: "02_basic/",
            }, {
                text: "服务器",
                prefix: "03_server/",
                children: [
                    {
                        text: "服务安装",
                        link: "01_install/",
                    }, {
                        text: "服务运维",
                        link: "02_ops/",
                    }
                ]
            }, {
                text: "客户端",
                prefix: "04_client/",
                children: [
                    {
                        text: "Android",
                        link: "01_android_app/",
                    }, {
                        text: "pc主机",
                        link: "02_pc/",
                    }
                ]
            }
        ]
    },
    {
        text: "深入Majora",
        icon: "fa6-solid:laptop-code",
        prefix: "/02_advance/",
        children: [
            {
                text: "部署高阶",
                link: "01_deploy_advance/",
            },
            {
                text: "场景",
                link: "02_scene/",
            },{
                text: "开发者",
                link: "03_developer/",
            },
        ]
    },
]);
