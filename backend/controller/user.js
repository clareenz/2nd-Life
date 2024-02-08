const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");

// keep in mind "file" use to connect in frontend
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        } else {
          res.json({ message: "File deleted succesfully" });
        }
      });
      return next(new ErrorHandler("User already exist", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    const activationToken = createActivationToken(user);

    const activationUrl = `htpp://localhost:3000/activation/${activationToken}`

    try {
      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500))
    }


  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create Activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m", //verification expire in 5 minutes
  });
};


// activate user 
module.exports = router;
