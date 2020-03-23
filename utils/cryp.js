const crypto = require('crypto');

// keyword for encryption
const SECRET_KEY = 'Summer_0330+';

// md5 encryption
function md5(content) {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

// encrypt function
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

module.exports = {
    genPassword
}