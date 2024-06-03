// routes/fbAuth.js
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Adjust the path to your User model
const router = express.Router();

const APP_ID = process.env.FB_APP_ID;
const APP_SECRET = process.env.FB_APP_SECRET;
const REDIRECT_URI = process.env.FB_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Initiates the Facebook Login flow
router.get('/oauth', (req, res) => {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
  res.redirect(url);
});

router.get('/oauth/fb_login', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
    const { access_token } = data;

    // Use access_token to fetch user profile
    const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);
    const { name, email } = profile;

    // Find or create user in database
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not have an email, you can still create the user
      user = new User({ name });
      await user.save();
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Store user in session
    req.session.user = user;

    // Send token to the client
    res.redirect(`/login-success?token=${token}`);
  } catch (error) {
    console.error('Error:', error.response?.data?.error || error.message);
    res.redirect('/login');
  }
});


// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
