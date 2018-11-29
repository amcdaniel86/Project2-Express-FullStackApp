const express       = require('express');
const router        = express.Router();
const Album         = require('../models/Album.js');
const Artist        = require('../models/Artist.js');
const Song          = require('../models/Song.js');
const flash        = require('connect-flash');

// Main List Songs View
router.get('/songs', (req, res, next)=>{
  Song.find()
    .then(songs => {
      res.render("songs/song-list", { songs });
    })
    .catch(err => {
      console.log(err)
    })
});

// Song Detail View
router.get('/songs/:id/details', (req, res, next)=>{
  let songId = req.params.id;
    Song.findById(songId)
    .then((song) => {
        console.log(song)
        res.render("songs/song-details", { song })
      })
      .catch(err => {
        console.log(err);
      })
});

// Add Song to Database
router.get('/song-new', (req, res, next) => {
  if(!req.user) {
    req.flash("error", "You must be logged in to add a song.");
    res.redirect("/login");
    return;
  }
  Artist.find()
      .then((allAlbums)=>{
        res.render("songs/song-new", {albums: allAlbums});
      })
      .catch((err)=>{
        next(err);
      })
});
// dropdown example above here

router.post('/song-new', (req, res, next) => {
      if(!req.user) {
        res.locals.message = "Error: You must be logged in to add to database.";
        res.render('users/login-page');
      }
        // req.body.user = req.user_id;
    Song.create(req.body)
      .then(()=>{
        console.log("-=-=-=-=-=-=-", req.body);
          res.redirect('/songs');
      })
      .catch(()=>{
        res.redirect('/song-new');
      })
});

// Delete Song from Database
router.post('/songs/:id/delete', (req, res, next)=>{
  if(!req.user) {
    req.flash("error", "You must be logged in to delete a song.");
    res.redirect("/login");
    return;
  }
  Song.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.redirect('/songs');
    })
    .catch((err)=>{
      next(err);
    })
});

// Edit Song in Database
router.get('/songs/:id/edit', (req, res, next)=>{
    if(!req.user) {
    req.flash("error", "You must be logged in to edit a song.");
    res.redirect("/login");
    return;
  }
  Song.findById(req.params.id)
    .then((song)=>{
console.log('=-=-=-=-=-=-=-=', song)
      res.render('songs/song-edit', { song })
    })
    .catch((err)=>{
      next(err);
    })
});


router.post('/songs/:id/edit', (req, res, next)=>{
  Song.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{
      res.redirect('/songs');
    })
    .catch((err)=>{
      next(err);
    })
});


// router.post('/songs/:id/edit', (req, res, next)=>{
  // if(!req.user) {
  //   req.flash("error", "You must be logged in to edit an song.");
  //   res.redirect("/login");
  //   return;
  // }
  // Song.findByIdAndUpdate(req.params._id, req.body)
  //   .then(()=>{
  //     console.log(req.body, '-=-=-=-=---=eeee');
  //     res.redirect('/songs');
  //   })
  //   .catch((err)=>{
  //     next(err);
  //   })
  // });
  // Artist.find()
  // .then((allTheArtists)=>{
  //   res.render('songs/song-edit', {artist, message: req.flash("error"), albums: allTheArtists} );
  // })
  // .catch((err)=>{
  //   next(err);
  // })











module.exports = router;