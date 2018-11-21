const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
      username: String,
      password: String,
      bio: String,
      favoriteArtist: {type: Schema.Types.ObjectId, ref:'Artist'},
      favoriteAlbum: {type: Schema.Types.ObjectId, ref: 'Album'},
      favoriteSong: String
})
// Schema.Types.ObjectId when referencing an Id from another key.

const User = mongoose.model('User', userSchema);
// 'User' is linked to the name of the collection in the database.

module.exports = User;

// model is same as a regular model.

// step 1 create the model.
// step 2 create the routes file.