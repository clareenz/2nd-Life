const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  conversationId:{
    type: String,
  },
  status: {
    type: String,
    enum: ["read", "unread"],
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
