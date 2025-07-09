const { BrowserWindow } = require('electron');


function passwordIpc(event, action, data) {

    const win = BrowserWindow.getFocusedWindow();
    
}

module.exports = passwordIpc;