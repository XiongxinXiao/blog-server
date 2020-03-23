const { REDIS_CONF } = require('../config/db');
const redis = require('redis');

// create client
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
    console.log(err);
})

module.exports = redisClient;