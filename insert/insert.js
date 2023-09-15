const nodemailer = require("nodemailer");

var con = require("../db_connection");
var connection = con.getConnection();
connection.connect();
var express = require("express");

var router = express.Router();
router.post("/", (req, res) => {
  var name = req.body.customerName;
  var contact = parseInt(req.body.contact);
  var email = req.body.email;
  var Address = req.body.Address;
  // console.log(name);

  connection.query(
    `insert into contact (customerName,contact,email,address) values("${name}","${contact}","${email}","${Address}")`,
    (err, result) => {
      if (err) {
        res.send({ insert: "fail", error: err });
      } else {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "amarjeetkumardmg8409@gmail.com",
            pass: "xmklxzwxtbphwbuu",
          },
        });
        var mailOptions = {
          from: "amarjeetkumardmg8409@gmail.com",
          to: req.body.email,
          cc: "amarjeetkumardmg8409@gmail.com",
          subject: "Thanks! for feeling contact form.",
          text: `Thanks for your message you have sent to us. We will contact you soon! Your detail have been saved with us.  \n
            Name: ${name}\n
            Contact:${contact}\n
            Email:${email}\n
            Address:${Address}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          }
        });
        res.send({ insert: "success" });
      }
    }
  );
});
module.exports = router;
