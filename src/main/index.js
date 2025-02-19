const { app, BrowserWindow } = require('electron');
const path = require('path');
const { testDatabase } = require('./storage/database');
const {autoUpdater} = require('electron-updater');
const logger = require('./logger.js');

function checkForUpdates() {
  // Solo ejecutar el actualizador si la app está empaquetada
  if (!app.isPackaged) {
    logger.info('Saltando verificación de actualizaciones en modo desarrollo');
    return;
  }

  try {
    autoUpdater.logger = logger;
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', (info) => {
      logger.info('Actualización disponible:', info);
    });

    autoUpdater.on('update-downloaded', (info) => {
      logger.info('Actualización descargada:', info);
    });

    autoUpdater.on('error', (err) => {
      logger.error('Error en actualización:', err);
    });
  } catch (error) {
    logger.error('Error al inicializar el actualizador:', error);
  }
}



let mainWindow;
  

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Esto debería ser true en producción
      webSecurity: true, // Activar en producción por seguridad
      nodeIntegrationInWorker: true,
      enableRemoteModule: true // Deprecado en versiones nuevas de Electron
    }
  });

  // Determina qué cargar basado en el ambiente
  if (!app.isPackaged) {
    // Ambiente de desarrollo - Carga desde webpack dev server
    mainWindow.loadURL('http://localhost:3000');
    // Abre las herramientas de desarrollo
    mainWindow.webContents.openDevTools();
    logger.info('Cargando desde servidor de desarrollo');
  } else {
    // Ambiente de producción - Carga el archivo compilado
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
    logger.info('Cargando desde archivo local');
  }
 
  // Test de base de datos
  testDatabase();

  // Emitido cuando la ventana es cerrada
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.whenReady().then(createWindow).then(checkForUpdates);
 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});