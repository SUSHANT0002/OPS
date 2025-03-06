const { createOrder, getOrderById } = require("../services/orderService");

const createOrderHandler = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id; // Extracted from authenticated user

    const order = await createOrder(userId, items);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrderHandler, getOrderHandler };
