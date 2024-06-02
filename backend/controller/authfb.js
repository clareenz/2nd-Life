const express = require('express');
const axios = require('axios');
const router = express.Router();

const APP_ID = process.env.FB_APP_ID;
const APP_SECRET = process.env.FB_APP_SECRET;
const REDIRECT_URI = 'https://frontend-topaz-ten.vercel.app/oauth/fb_login';

// Initiates the Facebook Login flow
router.get('/oauth', (req, res) => {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
  res.redirect(url);
});

// Callback URL for handling the Facebook Login response
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
      user = new User({ name, email });
      await user.save();
    }

    // Store user in session
    req.session.user = user;

    res.redirect('/');
  } catch (error) {
    console.error('Error:', error.response?.data?.error || error.message);
    res.redirect('/login');
  }
});

// Route for handling Facebook login POST request
router.post('/oauth/fblogin', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Perform necessary actions to handle the Facebook login data
    // For example, authenticate the user, save user data to the database, etc.

    res.status(200).json({ message: 'Successfully logged in with Facebook' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;