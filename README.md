# Order Processing System (Event-Driven & Scalable)

## **Overview**
This is a scalable, event-driven Order Processing System built using **Node.js, Express, MongoDB, Redis**, and **Nodemailer** for email notifications (instead of AWS SES). The system allows users to:

- Register & log in using **JWT authentication**
- Place orders & validate stock levels
- Process orders **asynchronously** with Redis-based queueing
- Cache order details in **Redis** for quick retrieval
- Send **email notifications** upon order completion

---

## **Tech Stack**
- **Node.js** + **Express.js** → Backend API
- **MongoDB** → Database for storing orders & inventory
- **Redis** → Caching & queue-based async processing
- **Nodemailer** → Email notifications
- **JWT** → Authentication with refresh tokens
- **Winston** → Logging & error tracking

---

## **Installation & Setup**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/order-processing.git
cd order-processing
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
REDIS_HOST=localhost
REDIS_PORT=6379
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-app-password
```

### **4️⃣ Start the Application**
```sh
npm start
```

### **5️⃣ Start the Order Processing Worker**
```sh
npm run worker
```

---

## **API Endpoints**

### **Authentication**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login and receive JWT tokens |
| POST   | `/api/auth/refresh` | Refresh access token |

### **Orders**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/orders` | Create a new order |
| GET    | `/api/orders/:id` | Get order details (cached in Redis) |

---

## **Testing with Postman**
Import the **Postman Collection** from the `postman_collection.json` file and run requests step by step.

---

## **Project Structure**
```sh
src/
├── config/
│   ├── database.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
├── models/
│   ├── User.js
│   ├── Order.js
│   ├── Inventory.js
├── routes/
│   ├── authRoutes.js
│   ├── orderRoutes.js
├── services/
│   ├── authService.js
│   ├── orderService.js
│   ├── redisService.js
│   ├── queueService.js
│   ├── emailService.js
├── workers/
│   ├── orderProcessor.js
├── utils/
│   ├── logger.js
├── server.js
├── .env
├── package.json
├── README.md
```

---

## **Next Steps**
✅ Ensure the `.env` file is configured correctly  
✅ Run the API in **Postman** to test all endpoints  
✅ Submit the GitHub repository & Postman collection 🚀

