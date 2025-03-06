const Order = require("../models/Order");
const { subscribeToOrderQueue } = require("../services/queueService");
const { sendOrderEmail } = require("../services/emailService");

const processOrder = async (order) => {
  try {
    console.log(`Processing order ${order._id}`);

    // Simulating async processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Update order status
    await Order.findByIdAndUpdate(order._id, { status: "Processed" });
    console.log(`Order ${order._id} processed successfully`);

    // Fetch user email (Populate user details)
    const updatedOrder = await Order.findById(order._id).populate("userId", "email");
    
    // Send email notification
    await sendOrderEmail(updatedOrder.userId.email, updatedOrder);
  } catch (error) {
    await Order.findByIdAndUpdate(order._id, { status: "Failed" });
    console.error(`Order ${order._id} failed:`, error);
  }
};

subscribeToOrderQueue(processOrder);
