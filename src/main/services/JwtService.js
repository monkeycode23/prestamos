const jwt = require('jsonwebtoken');


class JwtService {
    constructor() {
        this.jwt = jwt;
    }

    generateToken(user, expiration = '1h') {
        return this.jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: expiration });
    }

    verifyToken(token) {
        try {
            return this.jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            return false
        }
        
    }

    deleteToken(token) {
        return this.jwt.destroy(token);
    }
}

module.exports = JwtService;



