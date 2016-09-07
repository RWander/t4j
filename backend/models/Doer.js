const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doer = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

mongoose.model('doer', Doer);
