const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendMaill = async (options) => {
  // Read the HTML template file
  const htmlTemplate = fs.readFileSync('../../frontend/src/pages/passwordResetTemplate.html', 'utf8');


  // Replace placeholders with actual values
  const htmlContent = htmlTemplate
  .replace("{{name}}", options.name )
  .replace("{{resetLink}}", options.resetLink);

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: htmlContent,
  };

  await transporter.sendMaill(mailOptions);
};

module.exports = sendMaill;
