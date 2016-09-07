'use strict';

/* eslint-disable no-console */

const faker = require('faker');
const mongoose = require('mongoose');
const Doer = mongoose.model('doers');
const Customer = mongoose.model('customers');

function generate() {
  mongoose.connection.db.dropDatabase(function(err) {
    if (err) { console.log(err); return; }

    createDoers()
      .then(createCustomers)
      //.then(createJobs)
      .then(() => mongoose.connection.close())
      .catch(console.log);
  });
}

function createDoers() {
  return new Promise(function(resolve, reject) {
    const doers = [];
    for (let i = 0; i < 10; i++) {
      doers[i] = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`
      };
    }

    // save to db
    Promise.all(
      doers.map(doer => Doer.create(doer.name))
    ).then(
      doers => {
        doers.forEach(doer => {
          console.log(`Doer ${doer.name} is created.`);
        });
        console.log(`Total doers: ${doers.length}.`);
        resolve(doers);
      },
      err => reject(err)
    );
  });
}

function createCustomers(doers) {
  return new Promise(function(resolve, reject) {
    const customers = [];
    for (let i = 0; i < 20; i++) {
      customers[i] = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`
      };
    }

    // save to db
    Promise.all(
      customers.map(customer => Customer.create(customer.name))
    ).then(
      customers => {
        customers.forEach(customer => {
          console.log(`Customer ${customer.name} is created.`);
        });
        console.log(`Total customer: ${customers.length}.`);
        resolve(customers);
      },
      err => reject(err)
    );
  });
}

// function createJobs(customers) {
//   return new Promise(function(resolve, reject) {
//   });
// }

module.exports = generate;
