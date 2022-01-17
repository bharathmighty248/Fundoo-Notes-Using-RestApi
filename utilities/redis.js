const redis = require('redis');

const client = redis.createClient();

client.connect();

class Redis {
    redisNotebyId = (key) => {
        const cachevalue = client.get(key);
        return cachevalue;
    };

    redisLabelbyName = (key) => {
        const cachevalue = client.get(key);
        return cachevalue;
    }

    setData = (key,redisData) => {
        client.set(key,redisData);
    };

    clearCache = (key) => {
        client.del(key);
    };
}
module.exports = new Redis();
