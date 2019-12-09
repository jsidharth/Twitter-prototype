import redis from 'redis';
import Promise from 'bluebird';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  host: 'twittercache.xtkchn.ng.0001.use1.cache.amazonaws.com',
  port: '6379',
});

export default client;
