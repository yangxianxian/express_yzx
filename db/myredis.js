const redis = require('redis');
const redisServer = redis.createClient('6379','127.0.0.1');

redisServer.on('error',err => {
    console.log(err)
})

module.exports = redisServer