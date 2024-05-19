const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/webhook', async (req, res) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://api.paymongo.com/v1/webhooks',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ${btoa(process.env.PAYMONGO_SECRET_KEY)}'
      },
      data: {
        data: {
          attributes: {
            url: 'https://202e-175-176-71-31.ngrok-free.app/controller/paymongo_webhook',
            events: ['source.chargeable', 'payment.paid', 'payment.failed']
          }
        }
      }
    };
    if (data.attributes.events === "source.chargeable") {
        console.log("E-Wallet Payment Chargeable");
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error registering webhook:', error);
    res.status(500).json({ error: 'Failed to register webhook' });
  }
});

module.exports = router;
