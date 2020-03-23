const env = process.env.NODE_ENV; // environment variable

// confic
let MYSQL_CONF;
let REDIS_CONF;

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'ec2-35-183-122-216.ca-central-1.compute.amazonaws.com',
        user: 'root',
        password: 'XxxYy0708',
        port: '3306',
        database: 'myblog'
    };

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'ec2-35-183-122-216.ca-central-1.compute.amazonaws.com',
        user: 'root',
        password: 'XxxYy0708',
        port: '3306',
        database: 'myblog'
    };

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}

