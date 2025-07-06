const JwtService = require('../services/JwtService');

const jwtService = new JwtService();
 
function tokenIpc(event, action, data,expired="1h") {
    switch (action) {
        case 'generate':
            return jwtService.generateToken(data,expiration=expired);
        case 'verify':
            return jwtService.verifyToken(data);
        case 'delete':
            return jwtService.deleteToken(data);
    }
}


module.exports = tokenIpc;