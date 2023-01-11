/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";
import { initConfig } from "./libs/utils/F1MV";
import { PartyManager } from "./libs/utils/PartyManager";
import { initDarkmode } from "./libs/utils/UI";

(async () => {
    console.log("[UI] Starting init UI");
    initDarkmode();
    console.log("[UI] UI Init finished");

    console.log(
        "[JOIN] Asking to the main proccess if a join is in progress..."
    );
    let joinInProgress: string | null = null;
    try {
        // @ts-ignore
        joinInProgress = await window.electronAPI.requestJoin();
        console.debug(joinInProgress);
    } catch (error) {
        console.log("No join session in progress detected or an error occured");
    }
    console.log(
        "[JOIN] OK"
    );

    console.log("[F1MV] Starting init F1MV Config");
    const config = initConfig(joinInProgress === null ? false : true);
    console.log("[F1MV] F1MV Config Init finished");


    // @ts-ignore
    window.PartyManager = PartyManager;
})();
