const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Job = new Schema({
  summary: {
    type: String,
    required: true,
    trim: true
  },
  postedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },
  tags: [{
    type: String
  }]
});

mongoose.model('jobs', Job);
