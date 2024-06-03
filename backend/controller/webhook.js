const express = require('express');
const router = express.Router();

// Webhook handler function
const webhookHandler = async (req, res) => {
  if (req.method === "POST") {
    console.log("===Webhook triggered===");
    const data = req.body.data;
    console.log(data);
    console.log("===webhook end===");
    res.status(200).send("Webhook Received");
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
  }
};

// Define the webhook route
router.post('/', webhookHandler);

// Optional: handle other HTTP methods for the same route
router.all('/', (req, res) => {
  res.setHeader("Allow", "POST");
  res.status(405).send("Method Not Allowed");
});

module.exports = router;
