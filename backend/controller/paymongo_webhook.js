const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define the webhook endpoint handler
router.post('/paymongo-webhook', async (req, res) => {
  try {
    const payload = req.body; // Get the webhook payload
    
    // Handle different types of events
    switch (payload.event.type) {
      case 'source.chargeable':
        // Handle source chargeable event
        const sourceId = payload.data.id;
        await createPayment(sourceId);
        break;
      case 'payment.paid':
        // Handle payment paid event
        // Update your system/database accordingly
        break;
      case 'payment.failed':
        // Handle payment failed event
        // Update your system/database accordingly
        break;
      default:
        // Handle other types of events if needed
        break;
    }
    
    // Send a success response to PayMongo
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Function to create a payment using the chargeable source ID
const createPayment = async (sourceId) => {
  // Implement payment creation logic here
};

// Create the webhook using axios
router.post('/create-webhook', async (req, res) => {
  try {
    const response = await axios.post('https://api.paymongo.com/v1/webhooks', {
      url: 'https://af89-175-176-71-2.ngrok-free.app/controller/paymongo_webhook',
      events: ['source.chargeable', 'payment.paid', 'payment.failed']
    }, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfdGVzdF9MeW9DQmhnUkJaQjVuelNvVnYxajVQeWg6'
      }
    });

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating webhook:', error);
    res.status(500).json({ error: 'Failed to create webhook' });
  }
});

module.exports = router;
