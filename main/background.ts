import { app, globalShortcut } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

enum ProcessPlatform{
  MacOs = 'darwin',
  Windows = 'win32',
  Linux = 'linux',
}
const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  globalShortcut.register('CommandOrControl+Shift+:', () => {
    if (!mainWindow) return;
    mainWindow.setVisibleOnAllWorkspaces(true);

    mainWindow.restore();
    mainWindow.focus();
  });

  app.on('browser-window-blur', () => {
    if (process.platform !== ProcessPlatform.MacOs) return;
    mainWindow.setVisibleOnAllWorkspaces(false);
    app.dock.hide();
  });
})();

app.on('window-all-closed', () => {
  app.quit();
});
