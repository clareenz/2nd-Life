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

{/*
router.get('/oauth/fb_login', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.get(`https://graph.facebook.com/v20.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
    const { access_token } = data;

    // Use access_token to fetch user profile
    const { data: profile } = await axios.get(`https://graph.facebook.com/v20.0/me?fields=name,email&access_token=${access_token}`);
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
*/}

router.get('/oauth/fb_login', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.get(`https://graph.facebook.com/v20.0/oauth/access_token`, {
      params: {
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI
      }
    });
    const { access_token } = data;

    // Use access_token to fetch user profile
    const { data: profile } = await axios.get(`https://graph.facebook.com/v20.0/me`, {
      params: {
        fields: 'id,name,email,link',
        access_token: access_token
      }
    });
    const { id, name, email, link } = profile;

    // Find or create user in database
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not have an email, you can still create the user
      user = new User({ facebookId: id, name, email, link });
      await user.save();
    } else {
      // Update the user information with the latest profile data
      user.facebookId = id;
      user.name = name;
      user.link = link;
      await user.save();
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Store user in session
    req.session.user = user;

    // Redirect to homepage with token
    res.redirect(`/?token=${token}`);
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
