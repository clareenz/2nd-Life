const express = require('express');
const router = express.Router();
const Notification = require('../model/notification');
const ErrorHandler = require('../utils/ErrorHandler');

// Create a notification
router.post('/create-notification', async (req, res, next) => {
  try {
    const { senderId, receiverId, type, message } = req.body;
    const notification = new Notification({ senderId, receiverId, type, message });
    await notification.save();
    res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    next(new ErrorHandler(error.message), 500);
  }
});

// Get notifications for a receiver
router.get('/get-notifications/:id', async (req, res, next) => {
  const receiverId  = req.params.id;
  console.log(req.params.id)
  try {
    const notifications = await Notification.find( {receiverId} );
    const unreadNotifications = await Notification.find({ receiverId, status: 'unread' });
    res.status(201).json({
      success: true,
      notifications,
      unreadNotifications,
    });
  } catch (error) {
    next(new ErrorHandler(error.message), 500);
  }
});

// Update notification status to "read"
router.put('/read/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { status: 'read' }, { new: true });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    next(new ErrorHandler(error.message), 500);
  }
});


module.exports = router;
