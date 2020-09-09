const {app, BrowserWindow, globalShortcut} = require('electron');
const path = require('path');

function createWindow(){
    const mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.loadFile('index.html');
    
    //Open DevTools
    mainWindow.webContents.openDevTools();

    return mainWindow;
}

app.whenReady().then(() => {
    const window = createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    });

    app.on('window-all-closed', () => {
        if(process.platform !== 'darwin'){ //macOS
            app.quit();
        }
    });

    globalShortcut.register('CommandOrControl+P', () => {
        if(window){
            window.restore();
            window.focus();
        }
    })
})
