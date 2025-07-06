const { app } = require('electron');


     

const appStatsIpc = (event, action, data) => {

    switch (action) {
        case 'version':
            return app.getVersion();
        case 'platform':
            return process.platform;
        case 'arch':
            return process.arch;
        case 'userDataPath':
            return app.getPath('userData');
        case 'appDataPath':
            return app.getPath('appData');
        case 'tempPath':
            return app.getPath('temp');
        case 'homePath':
            return app.getPath('home');
        default:
    }
}

module.exports = appStatsIpc;