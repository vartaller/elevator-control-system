const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow = null;

app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1200,
        height: 800,
    });
    mainWindow.loadFile(path.join(__dirname, 'views', 'layouts', 'index.html'));
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });
    // mainWindow.webContents.openDevTools()
});