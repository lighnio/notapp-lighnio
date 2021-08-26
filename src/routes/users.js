const router = require("express").Router();
const User = require('../models/User');
const passport = require('passport')
const { isAuthenticated } = require('../helpers/auth');

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if ((!name, !email, !password)) {
    errors.push({ text: "Fields not be empty." });
  } else {
    if (name.length < 2) errors.push({ text: "Please insert your name." });
    if (email.length < 11) errors.push({ text: "Email too short." });
    if (password !== confirm_password) errors.push({text: 'Passwords not match.'});
        else if (password.length < 4) errors.push({text: 'Password must be at least 4 characters.'});
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailUser = await User.findOne({email: email});
    if(emailUser){
        req.flash('error_msg', 'The email is already taken.');
        res.redirect('/users/signup');
    }
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    req.flash('success_msg', 'Registered');
    res.redirect('/users/signin');
  }
});

router.get('/users/logout', (req, res) => {
  req.logout();
  res.redirect('/');  
});

module.exports = router;
