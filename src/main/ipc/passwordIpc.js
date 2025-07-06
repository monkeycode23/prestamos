const { BrowserWindow } = require('electron');

const PasswordService = require('../services/passwordService');

const passwordService = new PasswordService();

function passwordIpc(event, action, data,hash) {

    const win = BrowserWindow.getFocusedWindow();
    switch (action) {
        case 'hash':
            try {
                const hash = passwordService.hash(data);
                win.webContents.send('messages', 'success', 'Password hashed');
                return hash;
            } catch (error) {
                win.webContents.send('messages', 'error', error.message);
            }
        case 'verify':
            try {
                const verify = passwordService.verify({password:data,hash:hash});
                return verify
            } catch (error) {
                win.webContents.send('messages', 'error', error.message);
            }
           
    }
}

module.exports = passwordIpc;