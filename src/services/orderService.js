const Order = require("../models/Order");
const Inventory = require("../models/Inventory");
const { publishOrderToQueue } = require("./queueService");
const { cacheOrder, getCachedOrder } = require("./redisService");
const logger = require("../utils/logger");

const createOrder = async (userId, items) => {
  try {
    let totalAmount = 0;

    for (const item of items) {
      const product = await Inventory.findOne({ productId: item.productId });
      if (!product || product.stock < item.quantity) {
        logger.warn(`Order failed - Product ${item.name} is out of stock`);
        throw new Error(`Product ${item.name} is out of stock`);
      }
      totalAmount += item.price * item.quantity;
    }

    const order = new Order({ userId, items, totalAmount, status: "Pending" });
    await order.save();

    // Deduct stock levels
    for (const item of items) {
      await Inventory.updateOne(
        { productId: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }

    logger.info(`Order ${order._id} created successfully`);

    // Send order to async queue for processing
    await publishOrderToQueue(order);

    return order;
  } catch (error) {
    logger.error(`Error creating order: ${error.message}`);
    throw error;
  }
};

const getOrderById = async (orderId) => {
  try {
    const cachedOrder = await getCachedOrder(orderId);
    if (cachedOrder) {
      logger.info(`Cache hit for order ${orderId}`);
      return cachedOrder;
    }

    const order = await Order.findById(orderId).populate("userId", "name email");
    if (!order) {
      logger.warn(`Order ${orderId} not found`);
      return null;
    }

    await cacheOrder(orderId, order);
    return order;
  } catch (error) {
    logger.error(`Error fetching order ${orderId}: ${error.message}`);
    throw error;
  }
};

module.exports = { createOrder, getOrderById };
