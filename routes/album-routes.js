const express = require('express');
const router = express.Router();
const Album = require('../models/Album.js');
const Artist = require('../models.Artist.js');

// Main List Albums View
router.get('/albums', (req, res, next)=>{
  Album.find()
    .then(albums => {
      res.render("albums", { albums });
    })
    .catch(err => {
      console.log(err)
    })
});

// Album Detail View
router.get('/albums/:id', (req, res, next)=>{
  let albumId = req.params.id;
    Album.findOne({'_id': albumId})
      .then(album => {
        res.render("albums/album-details", { album })
      })
      .catch(err => {
        console.log(err);
      })
});

// Add Album to Database
router.get('/albums/album-new', (req, res, next) => {
    res.render("albums/album-new");
});

router.post('/albums/album-new', (req, res, next) => {
    Album.create(req.body)
      .then(()=>{
          res.redirect('/albums/albums');
      })
      .catch(()=>{
        res.redirect('/albums/new');
      })
});

// Delete Album from Database
router.post('/albums/:id/delete', (req, res, next)=>{
  Albums.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.redirect('/albums/albums');
    })
    .catch((err)=>{
      next(err);
    })
});

// Edit Album in Database
router.get('/albums/:id/edit', (req, res, next)=>{
  Album.findById(req.params.id)
    .then((album)=>{
      res.render('albums/edit', { album })
    })
    .catch((err)=>{
      next(err);
    })
});

router.post('/albums/:id/edit', (req, res, next)=>{
  Album.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{
      res.redirect('/albums/albums');
    })
    .catch((err)=>{
      next(err);
    })
});











module.exports = router;