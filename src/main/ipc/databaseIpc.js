const { BrowserWindow } = require('electron');

const database = require('../storage/database');


const db = new database();
db.connect();
db.init();

 
 

try {

    //db.deleteDatabase();
  /*   db.deleteTable('users');
    db.deleteTable('clients');
    db.deleteTable('stats');
    db.deleteTable('test_table'); */


} catch (error) {
    console.log(error);
}

function databaseIpc(event,action,table,query,data,options) {

    const win = BrowserWindow.getFocusedWindow();

    try {
        switch (action) {
            case 'createTable':
           return     db.createTable(query, data);
                win.webContents.send('messages', 'success', 'Table created');
                break;
            case 'insert':
              return  db.insert(table,query, data);
                break;
            case 'select':
             return  db.select(table,query,data,options);
                break;
            case 'update':
             return   db.update(table,query, data);
                break;
            case 'delete':
            return    db.delete(table,query, data);
                break;
            case 'close':
            return    db.close();
                break;
            case 'getTabesInfo':
           return     db.getTabesInfo();
                break;
            case 'getTableInfo':
             return   db.getTableInfo(query);
                break;
                
        }

        win.webContents.send('messages', 'success', 'Database operation successful');
    } catch (error) {
        win.webContents.send('messages', 'error', error.message);
    }
   

}


module.exports = databaseIpc;


