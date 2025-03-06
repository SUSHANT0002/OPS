const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
const logger = require("./src/utils/logger");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));

// Error Handling Middleware (Always last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
