const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

/**
 * Creates a new Customer instance.
 * @param  {String} name
 * @return {Promise}
 */
Customer.statics.create = function(name) {
  const self = this;

  return new Promise(function(resolve, reject) {
    const customer = new self({name: name});
    customer.save(function(err) {
      if (err) return reject(err);
      resolve(customer);
    });
  });
};

mongoose.model('customers', Customer);
