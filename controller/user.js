const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = async (username, password) => {
    // make speical symbol not special, Unicode property escapes
    username = escape(username);

    // encrypt the password
    password = genPassword(password);
    password = escape(password);

    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `;
    const rows = await exec(sql);
    return rows[0] || {};
}

module.exports = {
    login
}