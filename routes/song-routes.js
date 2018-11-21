const express = require('express');
const router = express.Router();
const Song = require('../models/Song.js');

// Main List Songs View
router.get('/songs', (req, res, next)=>{
  Song.find()
    .then(songs => {
      res.render("songs", { songs });
    })
    .catch(err => {
      console.log(err)
    })
});

// Song Detail View
router.get('/songs/:id', (req, res, next)=>{
  let songId = req.params.id;
    Song.findOne({'_id': songId})
      .then(song => {
        res.render("songs/song-details", { song })
      })
      .catch(err => {
        console.log(err);
      })
});

// Add Song to Database
router.get('/songs/song-new', (req, res, next) => {
    res.render("songs/song-new");
});

router.post('/songs/song-new', (req, res, next) => {
    Song.create(req.body)
      .then(()=>{
          res.redirect('/songs/songs');
      })
      .catch(()=>{
        res.redirect('/songs/new');
      })
});

// Delete Song from Database
router.post('/songs/:id/delete', (req, res, next)=>{
  Song.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.redirect('/songs/songs');
    })
    .catch((err)=>{
      next(err);
    })
});

// Edit Song in Database
router.get('/songs/:id/edit', (req, res, next)=>{
  Song.findById(req.params.id)
    .then((song)=>{
      res.render('songs/edit', { song })
    })
    .catch((err)=>{
      next(err);
    })
});

router.post('/songs/:id/edit', (req, res, next)=>{
  Song.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{
      res.redirect('/songs/songs');
    })
    .catch((err)=>{
      next(err);
    })
});











module.exports = router;