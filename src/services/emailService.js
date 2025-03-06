const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use any SMTP provider (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Sender's email
    pass: process.env.EMAIL_PASS, // App password (if using Gmail, enable "App Passwords")
  },
});

// Function to send order confirmation email
const sendOrderEmail = async (email, order) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order #${order._id} Status: ${order.status}`,
    html: `
      <h2>Order Confirmation</h2>
      <p>Your order <strong>${order._id}</strong> has been processed.</p>
      <p>Status: <strong>${order.status}</strong></p>
      <h3>Items:</h3>
      <ul>
        ${order.items.map((item) => `<li>${item.name} - ${item.quantity} x $${item.price}</li>`).join("")}
      </ul>
      <p><strong>Total Amount: $${order.totalAmount}</strong></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendOrderEmail };
