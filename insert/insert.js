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
        res.send({ insert: "success" });
      }
    }
  );
});
module.exports = router;
