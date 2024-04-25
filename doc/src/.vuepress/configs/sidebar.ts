import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar({
        "/01_user_manual/": [
            "01_quick_start", "02_basic",
            {
                "text": "服务器",
                prefix: "03_server",
                children: [
                    "01_install", "02_ops",
                ]
            }
            , {
                "text": "客户端",
                prefix: "04_client",
                children: [
                    "01_android_app", "02_pc"
                ]
            }
        ],
        "/02_advance/": [
            "","01_deploy_advance","02_scene","03_developer"
        ],

    }
);
