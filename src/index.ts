/* eslint-disable @typescript-eslint/ban-ts-comment */
import { app, BrowserWindow, dialog, protocol, session } from "electron";
import path from "path";
import { IRouter } from "./libs/utils/Types";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const privileges = {
    standard: true,
    bypassCSP: true,
    allowServiceWorkers: true,
    supportFetchAPI: true,
    corsEnabled: false,
    stream: true,
};

const createWindow = (): BrowserWindow => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    return mainWindow;
};

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient("f1mv-watchgroups", process.execPath, [
            path.resolve(process.argv[1]),
        ]);
    }
} else {
    app.setAsDefaultProtocolClient("f1mv-watchgroups");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
protocol.registerSchemesAsPrivileged([
    { scheme: "http", privileges },
    { scheme: "https", privileges },
    { scheme: "wss", privileges },
    { scheme: "homemade_f1mv", privileges },
    { scheme: "mailto", privileges: { standard: true } },
]);
app.on("ready", () => {
    session.defaultSession.webRequest.onBeforeSendHeaders(
        {
            urls: [
                "https://licensing.bitmovin.com/*",
                "https://*.formula1.com/*",
            ],
        },
        // @ts-ignore
        (
            details: {
                url: string;
                requestHeaders: {
                    [x: string]: any;
                    referer: any;
                    Referer: any;
                };
            },
            callback: (arg0: { cancel?: boolean; requestHeaders?: any }) => void
        ) => {
            if (details.url.match(/^https:\/\/licensing\.bitmovin\.com/)) {
                console.log("Bitmovin Call - Blocking request");
                return callback({ cancel: true });
            }

            if (
                details.url.match(
                    /^https:\/\/(dev-)?livetiming\.formula1\.com\//
                )
            ) {
                console.log("F1 Live Timing Call - Editing headers...");
                const { referer, Referer, ...headers } = details.requestHeaders;

                const secFetchSite = details.url.startsWith(
                    "https://f1tv.formula1.com"
                )
                    ? "same-origin"
                    : "same-site";

                return callback({
                    requestHeaders: {
                        ...headers,
                        // 'user-agent':
                        //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                        referer: "https://www.formula1.com/",
                        Origin: "https://www.formula1.com",
                        "Sec-Fetch-Site": secFetchSite,
                        // Cookie: [authCookie, Cookie, cookie]
                        //     .filter(Boolean)
                        //     .join('; '),
                        Cookie: "GCLB=CLLmiLaG7obCmwE",
                        "sec-ch-ua": '"Not;A=Brand";v="99", "Chromium";v="106"',
                    },
                });
            }

            console.log("F1 Call - Editing headers...");
            const { referer, Referer, ...headers } = details.requestHeaders;

            const secFetchSite = details.url.startsWith(
                "https://f1tv.formula1.com"
            )
                ? "same-origin"
                : "same-site";

            callback({
                requestHeaders: {
                    ...headers,
                    "user-agent":
                        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                    referer: "https://www.formula1.com/",
                    Origin: "https://f1tv.formula1.com",
                    "Sec-Fetch-Site": secFetchSite,
                    // Cookie: [authCookie, Cookie, cookie]
                    //     .filter(Boolean)
                    //     .join('; '),
                },
            });
        }
    );
    createWindow();
});

async function handleJoinParty(path?: Array<string>) {
    // dialog.showErrorBox(
    //     "Welcome Back",
    //     `You arrived from: ${path.join(" > ")}`
    // );
    const window = createWindow();

    window.on("focus", () => {
        window.webContents.send("join-party", path[1]);
    });
}

app.on("open-url", (event, url) => {
    // dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);

    let path = url.slice("F1MV_WatchGroups".length + 3).split("/");

    const router: IRouter[] = [
        {
            host: "party",
            match: /(join)\/.{9}/gm,
            handler: handleJoinParty,
        },
    ];
    // dialog.showErrorBox("Welcome Back", `You arrived from: ${path.join(' > ')}`);

    for (let _i = 0; _i < router.length; _i++) {
        const route: IRouter = router[_i];

        if (route.host === path[0]) {
            path = path.filter((e) => e !== route.host);
            if (route.match.test(path.join("/")) === true) {
                route.handler(path);
            }
        }
    }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
