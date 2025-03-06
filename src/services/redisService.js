const Redis = require("ioredis");

const redisClient = new Redis();
const ORDER_CACHE_PREFIX = "order:";
const CACHE_EXPIRATION = 600; // 10 minutes

const cacheOrder = async (orderId, orderData) => {
  await redisClient.setex(ORDER_CACHE_PREFIX + orderId, CACHE_EXPIRATION, JSON.stringify(orderData));
};

const getCachedOrder = async (orderId) => {
  const cachedOrder = await redisClient.get(ORDER_CACHE_PREFIX + orderId);
  return cachedOrder ? JSON.parse(cachedOrder) : null;
};

module.exports = { cacheOrder, getCachedOrder };
