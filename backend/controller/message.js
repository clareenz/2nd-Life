const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const cloudinary = require("cloudinary");
const router = express.Router();
const { upload } = require("../multer");
const Notification = require("../model/notification");
const Conversation = require("../model/conversation");

// create new message
router.post(
  "/create-new-message",
  upload.single("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;

      if (req.file) {
        const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "messages",
          public_id: req.file.filename,
        });
        messageData.images = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        };
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images || undefined,
      });

      await message.save();

      //for Notifications
      const conversation = await Conversation.findById(
        messageData.conversationId
      );
      const receiverId = conversation.members.find(
        (user) => user !== messageData.sender
      );


      const notif = new Notification({
        senderId: messageData.sender,
        receiverId: receiverId, // Corrected variable name
        type: "message", // Corrected type definition
        message: "new chat message",
        conversationId: messageData.conversationId,
      });
      await notif.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500)); // Corrected error handling
    }
  })
);
// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);



module.exports = router;
