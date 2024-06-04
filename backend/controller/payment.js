
const express = require("express");

const router = express.Router();
const axios = require('axios');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process",

  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,

      currency: "USD",

      metadata: {
        company: "Becodemy",
      },
    });

    res.status(200).json({
      success: true,

      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",

  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

// Create a PayMongo checkout session
router.post("/create-checkout-session", async (req, res, next) => {
  const { name, email, phone, address, lineItems, successUrl, cancelUrl } =
    req.body;
  console.log(req.body.lineItems);
  const options = {
    method: 'POST',
    url: 'https://api.paymongo.com/v1/checkout_sessions',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Basic c2tfdGVzdF9MeW9DQmhnUkJaQjVuelNvVnYxajVQeWg6'
    },
    data: {
      data: {
        attributes: {
          billing: {
            address: {
              country: address.country,
              postal_code: address.postalCode,
              state: address.state,
              city: address.city,
              line2: address.line2
            },
            name: name,
            email: email,
            phone: phone
          },
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          line_items: lineItems.map((item) => ({
            currency: "PHP",
            amount: item.discountPrice * 100, // Ensure amount is in cents
            name: item.name,
            quantity: item.qty,
            images: [item.images[0].url]
          })),
          payment_method_types: ['gcash', 'paymaya'],
          cancel_url: cancelUrl,
          description: 'Hi there',
          success_url: successUrl
        }
      }
    }
  };
  console.log(options);
  try {
    const response = axios
.request(options)
      .then(function (response) {
        res.status(200).json({
          success: true,
          message: `Yehey Paymongo`,
          response: response.data,
        });
      })
      .catch(function (error) {
        console.error(error.message);
      });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
