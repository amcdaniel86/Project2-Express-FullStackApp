const express       = require('express');
const router        = express.Router();
const Album         = require('../models/Album.js');
const Artist        = require('../models/Artist.js');
const flash        = require('connect-flash');

// Main List Albums View
router.get('/albums', (req, res, next)=>{
  Album.find()
    .then(albums => {
      res.render("albums/album-list", { albums });
    })
    .catch(err => {
      console.log(err)
    })
});

// Album Detail View
router.get('/albums/:id/details', (req, res, next)=>{
  let albumId = req.params.id;
    Album.findById(albumId)
    .then((album) => {
        console.log(album)
        res.render("albums/album-details", { album })
      })
      .catch(err => {
        console.log(err);
      })
});

// Add Album to Database
router.get('/album-new', (req, res, next) => {
    res.render("albums/album-new");
});

router.post('/album-new', (req, res, next) => {
      if(!req.user) {
        res.locals.message = "Error: You must be logged in to add to database.";
        res.render('users/login-page');
      }
        // req.body.user = req.user_id;
    Album.create(req.body)
      .then(()=>{
          res.redirect('/albums');
      })
      .catch(()=>{
        res.redirect('/album-new');
      })
});

// Delete Album from Database
router.post('/albums/:id/delete', (req, res, next)=>{
  Album.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.redirect('/albums');
    })
    .catch((err)=>{
      next(err);
    })
});

// Edit Album in Database
router.get('/albums/:id/edit', (req, res, next)=>{
  Album.findById(req.params.id)
    .then((album)=>{

      res.render('albums/album-edit', { album })
    })
    .catch((err)=>{
      next(err);
    })
});

router.post('/albums/:id/edit', (req, res, next)=>{
  if(!req.user) {
    req.flash("error", "You must be logged in to edit an artist.");
    res.redirect("/login");
    return;
  }
  Album.findById(req.params.id)
    .then((artist)=>{
      Album.find()
      .then((allTheAlbums)=>{
        res.render('artists/artist-edit', {artist, message: req.flash("error"), albums: allTheAlbums} );
      })
      .catch((err)=>{
        next(err);
      })
    })
    .catch((err)=>{
      next(err);
    })
});











module.exports = router;