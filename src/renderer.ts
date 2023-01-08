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
import { initSocket } from "./libs/utils/Socket";
import { initDarkmode } from "./libs/utils/UI";

console.log("[UI] Starting init UI");
initDarkmode();
console.log("[UI] UI Init finished");

console.log("[F1MV] Starting init F1MV Config");
const config = initConfig();
console.log("[F1MV] F1MV Config Init finished");

console.log("[Socket] Starting init Socket Config");
initSocket();
console.log("[Socket] Socket Config Init finished");
