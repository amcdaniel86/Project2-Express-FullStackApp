const express = require('express');
const router = express.Router();
const User    = require('../models/User');
const bcrypt = require('bcryptjs');
// bcryptjs necessary in signup/login areas.

const passport = require('passport');
// not defined errors mean you're missing a const in your routes file or app.js


// Register/signup .get / .post routes
router.get('/register', (req, res, next)=>{
    res.render('users/signup-page');
});





// to sign up, WE ARE ADDING SOMETHING TO THE DATABASE.
router.post('/register', (req, res, next)=>{

      const  theUsername = req.body.username;
      const thePassword = req.body.password;
      const theBio      = req.body.bio;



// don't worry about how they work as of now, just know that these two const are required inside the router.post('/signup',) - how to scramble a password or any info that you want scrambled.
// use the salt to hash the password and save the scrambled verions and not save the original.
      const salt = bcrypt.genSaltSync(10);
      const theHash = bcrypt.hashSync(req.body.thePassword, salt);

      User.create({
        username: theUsername,
        password: theHash,
        // replaced thePassword because theHash makes it more secure.
        bio: theBio
      })
      .then(()=>{
          res.redirect('/');
      })
      .catch((err)=>{
        next(err);
      })
})






// can't have a form without a get route.
router.get('/login', (req, res, next)=>{
    res.render('login-page');
})

// can't make a post request, UNTIL THERE'S A FORM THAT IS ON A LOGIN VIEWS PAGE.
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
// passport.authenticate calls takes an argument and uses that argument
// to find which strategy you want to call, in our case its the local strategy
//defined in app.js

router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/');
})

router.get('/profile', (req, res, next)=>{
  res.render('profile')
  // req.user is magic, it automatically lets teh system know if passport being used, once logged in, req.user is a variable that you can use IN ANY ROUTE. It is equal to the entire USER OBJECT, username, password, bio etc all of it. theUser is arbitrary, a variable.
})








module.exports = router;

// req.body.usernamme
// req.body.password
// req.body.bio