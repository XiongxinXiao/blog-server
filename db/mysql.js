const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// create connection object
const con = mysql.createConnection(MYSQL_CONF);

// start connection
con.connect();

// mysal execute function
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result);
        })
    });
    return promise;
}

module.exports = {
    exec,
    escape: mysql.escape
}