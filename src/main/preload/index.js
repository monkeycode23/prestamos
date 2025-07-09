const { contextBridge, ipcRenderer } = require('electron');
 
   
    
contextBridge.exposeInMainWorld('electron', {
    database: {
        createTable: (table, columns) => ipcRenderer.invoke('database', 'createTable', table, columns),
        insert: (table, columns, values) => ipcRenderer.invoke('database', 'insert', table, columns, values),
        select: (table, query,data,options) => ipcRenderer.invoke('database', 'select', table, query, data, options),
        update: (table,query, columns, values) => ipcRenderer.invoke('database', 'update', table,query, columns, values),
        delete: (table, columns, values) => ipcRenderer.invoke('database', 'delete', table, columns, values),
        export: (filetype, filename) => ipcRenderer.invoke('database', 'export', filetype, filename),
        import: (filetype, filename) => ipcRenderer.invoke('database', 'import', filetype, filename),
        backup: (filename) => ipcRenderer.invoke('database', 'backup', filename),
        restore: (filename) => ipcRenderer.invoke('database', 'restore', filename),
        
    },

    token:{
        generate: (user,expired) => ipcRenderer.invoke('token', 'generate', user,expired),
        verify: (token) => ipcRenderer.invoke('token', 'verify', token),
        delete: (token) => ipcRenderer.invoke('token', 'delete', token),
 
    },
    password:{
        hash: (password) => ipcRenderer.invoke('password', 'hash', password),
        verify: (password, hash) => ipcRenderer.invoke('password', 'verify', password, hash),
    },
 
    messages:{
        onMessage: (callback) => ipcRenderer.on('messages', (event, type, title, data) => callback(type, title, data)),   
    },

    updater:{
        checkForUpdates: () => ipcRenderer.invoke('checkUpdates', 'checkForUpdates'),
        downloadUpdate: () => ipcRenderer.invoke('checkUpdates', 'downloadUpdate'),
        installUpdate: () => ipcRenderer.invoke('checkUpdates', 'installUpdate'),
    },  

    appStats:{
        version: () => ipcRenderer.invoke('appStats', 'version'),
        platform: () => ipcRenderer.invoke('appStats', 'platform'),
        arch: () => ipcRenderer.invoke('appStats', 'arch'),
        userDataPath: () => ipcRenderer.invoke('appStats', 'userDataPath'),
        appDataPath: () => ipcRenderer.invoke('appStats', 'appDataPath'),
        tempPath: () => ipcRenderer.invoke('appStats', 'tempPath'),
        homePath: () => ipcRenderer.invoke('appStats', 'homePath'),
    },
    
});
 
 


