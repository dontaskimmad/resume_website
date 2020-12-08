var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
require('dotenv').config()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/contactForm", (req, res, next) => {
  const {
    contactName,
    contactEmail,
    contactSubject,
    contactMessage,
  } = req.body;

  var message = contactName + "\n" + contactEmail + "\n\n" + contactMessage;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  console.log(process.env.EMAIL);
  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.RECEIVER,
    subject: contactSubject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;
