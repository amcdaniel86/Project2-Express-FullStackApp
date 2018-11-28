const express = require('express');
const router = express.Router();
const User    = require('../models/User');
const bcrypt = require('bcryptjs');
const Artist = require('../models/Artist');
const Album  = require('../models/Album');
// bcryptjs necessary in signup/login areas.

const flash        = require('connect-flash');

const passport = require('passport');
// not defined errors mean you're missing a const in your routes file or app.js


// Register/signup .get and .post routes
router.get('/register', (req, res, next)=>{
  Artist.find()
    .then((allTheArtists)=>{

  Album.find()
      .then((allTheAlbums)=>{
        res.render('users/signup-page', {message: req.flash("error"), artists: allTheArtists, albums: allTheAlbums} );
      })
      .catch((err)=>{
        next(err);
      })
    })
  
});

// to sign up, WE ARE ADDING SOMETHING TO THE DATABASE. must check with if statement if user exists already in the database.
router.post('/register', (req, res, next)=> {
      const theUsername = req.body.username;
      const thePassword = req.body.password;
      const theBio      = req.body.bio;

      if (req.body.password !== req.body.confirmPassword) {
        res.locals.message = "Error: incorrect Password!";
        res.render("users/signup-page");
        return
      }
      User.findOne({username: req.body.username})
        .then((user) => {
          if (user !== null) {
            res.locals.message = "Error: Username already taken";
            res.render("users/signup-page");
            return;
          }

// don't worry about how the hash/password work as of now, just know that these two const are required inside the router.post('/signup',) - how to scramble a password or any info that you want scrambled.
// use the salt to hash the password and save the scrambled verions and not save the original.
      const salt = bcrypt.genSaltSync(10);
      const theHash = bcrypt.hashSync(req.body.password, salt);
      
      // req.body.password: theHash
      User.create({
        username: req.body.username,
        password: theHash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
        homeTown: req.body.homeTown,
        favoriteArtist: req.body.favoriteArtist,
        favoriteAlbum: req.body.favoriteAlbum,
        favoriteSong: req.body.favoriteSong,
        image: req.body.image
// ADD HERE, FINISH, above left connects to model keys. above right connects to name fields in forms on post requests.
      })
          .then((newUser)=>{
            req.login(newUser, (err) =>{
              if(err) {

                req.locals.message = "Error: User not made, please try again later";
                res.render("users/signup-page");
                return
              }
                res.redirect('/profile');
            });
          })
        // replaced thePassword with theHash; makes it more secure.

          })
          .catch((err)=>{
            next(err);
          })
      .catch((err)=>{
        next(err);
      })
  });


// can't have a form without a get route.
router.get('/login', (req, res, next)=>{
    res.render('users/login-page', {message: req.flash("error")});
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

// Edit profile
router.get('/profile-edit', (req, res, next)=>  {
  User.findById(req.user.id)
    .then((user)=>{
      Artist.find()
    .then((allTheArtists)=>{

  Album.find()
      .then((allTheAlbums)=>{
        res.render('users/profile-edit', {message: req.flash("error"), artists: allTheArtists, albums: allTheAlbums, user: user} );
      })
      .catch((err)=>{
        next(err);
      })
    })
      console.log(user);
    })
    .catch((err)=>{
      next(err);
    });
});

router.post('/profile/:id/edit', (req, res, next)=>{
  const infoFromProfileEdit = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
        homeTown: req.body.homeTown,
        favoriteArtist: req.body.favoriteArtist,
        favoriteAlbum: req.body.favoriteAlbum,
        favoriteSong: req.body.favoriteSong,
        image: req.body.image
  }
      User.findByIdAndUpdate(req.params.id, infoFromProfileEdit)
        .then((theUser)=>{
            res.redirect('/profile');
        })
        .catch((err)=>{
            res.redirect('/profile-edit')
        })
});


router.get("/profile", (req, res, next)=>{
  if(!req.user) {
    req.flash("error", "sorry, you must be logged in.")
    res.redirect('/login');
  }
  User.findById(req.user.id)
  .then((user)=>{
      if(!req.user._id.equals(user._id)){
        req.logout();
        req.flash("error", "wrong profile, please try again with different profile.")
        res.redirect("/users/login-page");
        return
      }
      res.render("users/profile", {user})
  })
    .catch((err)=>{
      res.redirect('/login');
    })
})
  // req.user is magic, it automatically lets the system know if passport being used, once logged in, req.user is a variable that you can use IN ANY ROUTE. It is equal to the entire USER OBJECT, username, password, bio etc all of it. theUser is arbitrary, a variable.
  // NOT SURE WHAT ABOVE IS


router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/login');
});
// redirects to the get route.



module.exports = router;

// req.body.usernamme
// req.body.password
// req.body.bio