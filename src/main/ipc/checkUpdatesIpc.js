const { app, BrowserWindow } = require('electron');
const logger = require('../logger');
const { autoUpdater } = require('electron-updater');

   
function checkForUpdates(event, action, data) {

  try {
 
    autoUpdater.logger = logger;
    autoUpdater.forceDevUpdateConfig = true;
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = false;

    const win = BrowserWindow.getFocusedWindow();

    autoUpdater.on('update-not-available', (info) => {
      console.log("update-not-available", info);
      //win.webContents.send('messages', 'info', `No hay actualizaciones disponibles ${JSON.stringify(info)}`);
      win.webContents.send('messages', 'info', `No hay actualizaciones disponibles`, info);
    });

    autoUpdater.on('checking-for-update', () => {
      console.log("checking-for-update");
      win.webContents.send('messages', 'info', 'Verificando actualizaciones');
    });

    autoUpdater.on('update-available', (info) => {
      console.log("update-available", info);
      //win.webContents.send('messages', 'success', `actualización disponible ${JSON.stringify(info)}`);
      win.webContents.send('messages', 'success', `actualización disponible`, info);
      win.webContents.send('messages', 'success', `actualización disponible`, info);
    }); 

    autoUpdater.on('update-downloaded', (info) => {

      console.log("update-downloaded", info);
      //win.webContents.send('messages', 'success', `actualización descargada ${JSON.stringify(info)}`);
      win.webContents.send('messages', 'success', `actualización descargada`,info);

      // autoUpdater.quitAndInstall();
    });
 
    autoUpdater.on('download-progress', (progress) => {
      console.log(`📥 Descargando: ${progress.percent.toFixed(2)}%`);
      win.webContents.send('messages', 'info', `Descargando actualización`,  progress.percent.toFixed(2));
    });
    /* autoUpdater.on('download-progress', (progress, total, bytesPerSecond, percent) => {
      console.log("download-progress", progress, total, bytesPerSecond, percent);
      win.webContents.send('messages', 'info', `Descargando actualización ${JSON.stringify(progress)} ${JSON.stringify(total)} ${JSON.stringify(bytesPerSecond)} ${JSON.stringify(percent)}`);
    }); */

    autoUpdater.on('error', (err) => {
      console.log(err);
      win.webContents.send('messages', 'error', `error ${JSON.stringify(err)}`);
    });
    // win.webContents.send('messages', 'info', 'Verificando actualizaciones');



    switch (action) {
      case 'checkForUpdates':
        console.log("checkForUpdates");
        autoUpdater.checkForUpdates();

        break;
      case 'downloadUpdate':
        autoUpdater.downloadUpdate();
        break;
      case 'installUpdate':
        autoUpdater.quitAndInstall();
        break;
    }


    //autoUpdater.checkForUpdatesAndNotify();

  } catch (error) {
    win.webContents.send('messages', 'error', error.message);
  }
}


module.exports = checkForUpdates;