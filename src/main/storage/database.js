const Database = require('better-sqlite3');
const path = require('path');
const app = require('electron').app;
const logger = require('../logger');
const fs = require('fs');

function testDatabase() {
    try {
  

      /* const userDataPath = app.getPath('userData');
      const dbPath = path.join(userDataPath, 'test.db');
      
      // Si la base de datos no existe en userData, copiarla desde resources
      if (!fs.existsSync(dbPath)) {
        const resourcePath = process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), 'test.db')
          : path.join(process.resourcesPath, 'test.db');
          
        logger.info('Copiando base de datos desde:', resourcePath);
        fs.copyFileSync(resourcePath, dbPath);
        logger.info('Base de datos copiada a:', dbPath);
      } */
      // Usar directamente la ruta de resources
      const dbPath = process.env.NODE_ENV === 'development'
        ? path.join(app.getAppPath(), 'test.db')
        : path.join(process.resourcesPath, 'test.db');

      logger.info('Intentando acceder a la base de datos en:', dbPath);
      
      // Verificar si el archivo existe
      if (!fs.existsSync(dbPath)) {
        logger.error('No se encuentra el archivo de base de datos en:', dbPath);
        throw new Error('Archivo de base de datos no encontrado');
      }
      const db = new Database(dbPath);
      logger.info('Database connected');

      
      // Crear una tabla de prueba
      db.prepare(`
        CREATE TABLE IF NOT EXISTS test_table (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT
        )
      `).run();
  
      // Insertar un dato de prueba
      const insert = db.prepare('INSERT INTO test_table (name) VALUES (?)');
      insert.run('otra cosa total mente distinta');
      
      logger.info('Datos insertados');

      // Leer los datos
      const rows = db.prepare('SELECT * FROM test_table').all();
      console.log('Datos en la tabla:', rows);
      logger.info('Datos leidos');
      logger.info(JSON.stringify(rows));

      return 'Base de datos funcionando correctamente';
    } catch (error) {
      console.error('Error con la base de datos:', error);
      logger.error('Error con la base de datos:', error);
      return `Error: ${error.message}`;
    }
  }


  module.exports = {
    testDatabase
  }