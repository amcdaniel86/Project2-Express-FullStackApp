const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
      username: String,
      password: String,
      firstName: String,
      lastName: String,
      bio: String,
      homeTown: String,
      favoriteArtist: {type: Schema.Types.ObjectId, ref:'Artist'},
      favoriteAlbum: {type: Schema.Types.ObjectId, ref: 'Album'},
      favoriteSong: {type: Schema.Types.ObjectId, ref: 'Song'},
      image: String,
      admin: {type: Boolean, default: false}
}, {
      timestamps: true
});
// Schema.Types.ObjectId when referencing an Id from another key.

const User = mongoose.model('User', userSchema);
// 'User' is linked to the name of the collection in the database.

module.exports = User;

// model is same as a regular model.

// step 1 create the model.
// step 2 create the routes file.