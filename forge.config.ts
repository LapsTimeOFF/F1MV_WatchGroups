import type { ForgeConfig } from "@electron-forge/shared-types";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
    packagerConfig: {
        protocols: [
            {
                name: "F1MV WatchGroups",
                schemes: ["f1mv-watchgroups"],
            },
        ],
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-zip",
            platforms: ["win32", "linux"],
            config: {}
        },
        {
            name: "@electron-forge/maker-dmg",
            config: {
                format: "ULFO",
            },
        },
    ],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            devContentSecurityPolicy: "connect-src 'self' * f1mv:",
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: "./src/index.html",
                        js: "./src/renderer.ts",
                        name: "main_window",
                        preload: {
                            js: "./src/preload.ts",
                        },
                    },
                ],
            },
        }),
    ],
};

export default config;
