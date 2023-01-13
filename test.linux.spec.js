import { _electron as electron } from 'playwright'
import { test } from '@playwright/test'

test('get isPackaged', async () => {
    const electronApp = await electron.launch({
        args: ['./out/f1mv_watchgroups-linux-x64/resources/app/.webpack/main/index.js']
    })
    const isPackaged = await electronApp.evaluate(async ({
        app
    }) => {
        // This runs in Electron's main process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.isPackaged
    })
    console.log(isPackaged) // false (because we're in development mode)
    // close app
    await electronApp.close()
})