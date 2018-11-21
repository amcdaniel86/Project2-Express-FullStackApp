const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
      username: String,
      password: String,
      bio: String,
      favoriteArtist: {type: _Id, ref:'Artist'},
      favoriteAlbum: {type: _Id, ref: 'Album'},
      favoriteSong: {type: _Id, ref: 'Song'}
})

const User = mongoose.model('User', userSchema);
// 'User' is linked to the name of the collection in the database.

module.exports = User;

// model is same as a regular model.

// step 1 create the model.
// step 2 create the routes file.