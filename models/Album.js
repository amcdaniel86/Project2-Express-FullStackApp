const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// models are first step to creating new additions to the target database.
// anytime to make a Schema, we have to use mongoose.Schema, to use mongoose, we have to use ('mongoose'); thus require('mongoose') at the top.
// Schema is a feature of mongoose that allows us to make rules for the database, otherwise MongoDB is chaos. Also gives extra features such as default, unique, required, maxlength and minlength.

const albumSchema = new Schema({
  name: String,
  genre: {type: Schema.Types.ObjectId, ref: 'Artist'},
  songs: [
    {title: String, producer: String, duration: Number, Musician: [String], rating: Number }
  ],
  releaseDate: Date,
  sales: Number,
  rating: Number,
  // rules for the model from this Schema object.
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
  // provides timestamp when instance is created.
})

const Album = mongoose.model('Album', albumSchema);
// ^ this line creates the model from mongoose, which determines what the collection in the db is called. also gives all the magical methods like .find, .findById, .find


module.exports = Album;