// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    handleCounter: (
        callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
    ) => ipcRenderer.on("join-party", callback),
});
