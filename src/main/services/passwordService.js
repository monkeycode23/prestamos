const bcrypt = require('bcrypt');

class PasswordService {
    constructor() {
        this.password = bcrypt;
    }

    hash(password) {
        return this.password.hash(password, 10) // 10 is the salt rounds;
    }

    verify({password, hash}) {    
        return this.password.compareSync(password, hash);
    }
}

module.exports = PasswordService;   