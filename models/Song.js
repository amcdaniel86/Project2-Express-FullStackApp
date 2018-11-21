const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const songSchema = new Schema({
      title: String,
      album: {type: __id, ref: 'Album'},
      artist: {type: _id, ref: 'Artist'},
      duration: Number,
      producer: String,
      musician: String
})