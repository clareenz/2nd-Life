const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Load environment variables from .env file
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
    //path: "config/.env",
  });
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const payment = require("./controller/payment");
const order = require("./controller/order");
const withdraw = require("./controller/withdraw");
const cart = require("./controller/cart");
const fbLogin = require("./controller/authRoutes");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/withdraw", withdraw);
app.use("/api/v2/cart", cart);
app.use("/api/v2/fbLogin", fbLogin);

// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
