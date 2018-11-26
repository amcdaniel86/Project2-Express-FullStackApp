const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist.js');
const User    = require('../models/User.js');
// by requiring in the Task model, I now have access to Task.find, Task.Create, Task.findById, etc. important to allow certain methods to be used across the app.


// just like mongoose and schema, require('express') is needed because its used to maake a router.
// const router = creates an object that has a bunch of specific features that the developer chooses. with this object, you get methods like .get, .post, .put, .patch, .delete and they tell your app to wait for a request that matches. They then run whatever code is written inside them, ONLY WHEN CODE MATCHES.

// router.get takes two arguments, first arg is the url that we're going to sit and wait for.
// 2nd arg is the function that will RUN when THE FIRST ARG (URL) is ran (user navigates to URL). this function gets three arbitrary arguments by default. these three give us methods like res.render and res.json and res.redirect and req.params. can change their names (req, res etc can be changed before the .) as long as they match the .render, .json, .params that is used in the functions.

// Main List Artists View
router.get('/artists', (req, res, next)=>{
  Artist.find()
    .then(artists => {
      res.render("artist-list", { artists });
    })
    .catch(err => {
      console.log(err)
    })
});

// Artist Detail View
router.get('/artists/:id', (req, res, next)=>{
  let artistId = req.params.id;
    Artist.findOne({'_id': artistId})
      .then(artist => {
        res.render("artists/artist-details", { artist })
      })
      .catch(err => {
        console.log(err);
      })
});

// Add Artist to Database
router.get('/artists/artist-new', (req, res, next) => {
    res.render("artists/artist-new");
});

router.post('/artists/artist-new', (req, res, next) => {
    Artist.create(req.body)
      .then(()=>{
          res.redirect('/artists/artists');
      })
      .catch(()=>{
        res.redirect('/artists/artist-new');
      })
});

// Delete Artist from Database
router.post('/artists/:id/delete', (req, res, next)=>{
  Artists.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.redirect('/artists');
    })
    .catch((err)=>{
      next(err);
    })
});

// Edit Artist in Database
router.get('/artists/:id/edit', (req, res, next)=>{
  Artist.findById(req.params.id)
    .then((artist)=>{
      res.render('artists/edit', {artist})
    })
    .catch((err)=>{
      next(err);
    })
});

router.post('/artists/:id/edit', (req, res, next)=>{
  Artist.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{
      res.redirect('/artists/artists');
    })
    .catch((err)=>{
      next(err);
    })
});











module.exports = router;