var express = require("express");
var router = express.Router();
const User = require("../models/user");
var items = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/insert", (req, res, next) => {
  const user = new User({
    userName: req.body.username,
    userMail: req.body.usermail,
  });

  user.save((result, error) => {
    if (error) {
      console.log(error);
      res.redirect("/");
      return;
    }
    console.log("voici", result);
    res.redirect("/getusers");
  });
});

router.get("/getusers", (req, res, next) => {
  User.find({}, "userName userMail", (error, result) => {
    if (error) {
      console.log(error);
      res.redirect("/");
    }
    console.log(result);
    res.render("index", { items: result });
    console.log("Hello", items);
  });
});

router.post("/update", (req, res, next) => {
  const ID = req.body.id;
  const updatedUser = {
    userName: req.body.username1,
    userMail: req.body.usermail1,
  };
  User.updateOne({ _id: ID }, { $set: updatedUser }, (error, doc) => {
    if (error) {
      console.log(error);
      res.redirect("/");
      return;
    }
    console.log(doc);
    res.redirect("/getusers");
  });
});

router.post("/delete", (req, res, next) => {
  const ID = req.body.id1;
  User.deleteOne({ _id: ID }, (error, result) => {
    if (error) {
      console.log(error);
      res.redirect("/");
      return;
    }
    console.log(result);
    res.redirect("/getusers");
  });
});

module.exports = router;
