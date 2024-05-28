const nodemailer = require("nodemailer");
const fs = require("fs");

const sendMailSeller = async (options) => {
  // Read the HTML template file
  const htmlTemplate = fs.readFileSync('../frontend/src/pages/emailTemplateSeller.html', 'utf8');

  // Replace placeholders with actual values
  const htmlContent = htmlTemplate
    .replace("{{name}}", options.name )
    .replace("{{activationUrlSeller}}", options.activationUrlSeller);

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

  await transporter.sendMail(mailOptions);
};

module.exports = sendMailSeller;