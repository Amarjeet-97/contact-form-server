var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//enable the cors\
app.use(cors());
app.use(express.json());

const fetch = require("./fetch/fetch");
app.use("/fetch", fetch);

const insert = require("./insert/insert");
app.use("/insert", insert);

app.listen(8080);
console.log("server listring at port 8080");
