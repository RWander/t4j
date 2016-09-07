const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doer = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

/**
 * Creates a new Doer instance.
 * @param  {String} name
 * @return {Promise}
 */
Doer.statics.create = function(name) {
  const self = this;

  return new Promise(function(resolve, reject) {
    const doer = new self({ name: name});
    doer.save(function(err) {
      if (err) return reject(err);
      resolve(doer);
    });
  });
};

mongoose.model('doers', Doer);
