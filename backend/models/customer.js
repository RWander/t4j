const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

Customer.statics.create = function(data) {
  const self = this;

  return new Promise(function(resolve, reject) {
    const customer = new self(data);
    customer.save(function(err) {
      if (err) return reject(err);
      resolve(customer);
    });
  });
};

mongoose.model('customer', Customer);
