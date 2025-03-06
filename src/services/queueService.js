const Redis = require("ioredis");

const redisPublisher = new Redis();
const redisSubscriber = new Redis();

const ORDER_QUEUE_CHANNEL = "orderQueue";

const publishOrderToQueue = async (order) => {
  await redisPublisher.publish(ORDER_QUEUE_CHANNEL, JSON.stringify(order));
  console.log(`Order ${order._id} published to queue`);
};

const subscribeToOrderQueue = (callback) => {
  redisSubscriber.subscribe(ORDER_QUEUE_CHANNEL, (err) => {
    if (err) {
      console.error("Failed to subscribe to order queue", err);
    } else {
      console.log("Subscribed to order queue");
    }
  });

  redisSubscriber.on("message", (channel, message) => {
    if (channel === ORDER_QUEUE_CHANNEL) {
      callback(JSON.parse(message));
    }
  });
};

module.exports = { publishOrderToQueue, subscribeToOrderQueue };
