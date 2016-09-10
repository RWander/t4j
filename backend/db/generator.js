'use strict';

/* eslint-disable no-console */

const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');
const mongoose = require('mongoose');
const Doer = mongoose.model('doers');
const Customer = mongoose.model('customers');
const Job = mongoose.model('jobs');

let gDoers;
let gCustomers;
let gJobs;

function generate() {
  mongoose.connection.db.dropDatabase(function(err) {
    if (err) { console.log(err); return; }

    createDoers()
      .then(createCustomers)
      .then(createJobs)
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

        gDoers = doers;
        resolve();
      },
      err => reject(err)
    );

  });
}

function createCustomers() {
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

        gCustomers = customers;
        resolve();
      },
      err => reject(err)
    );

  });
}

function createJobs() {
  return new Promise(function(resolve, reject) {
    const jobs = [];
    const allTags = createTags();

    for (let i = 0; i < 100; i++) {
      const customer = gCustomers[faker.random.number(gCustomers.length - 1)];

      const tags = [];
      for(let i = 0; i < faker.random.number(8); i++) {
        tags[i] = allTags[faker.random.number({min:1, max:allTags.length}) - 1];
      }

      const responsed = faker.random.number(10);

      jobs[i] = {
        summary: faker.lorem.paragraph(),
        postedAt: faker.date.recent(),
        postedBy: customer._id,
        tags: tags,
        watched: faker.random.number(200),
        responsed: responsed,
        responses: createResponses(responsed)
      };
    }

    // save to db
    Promise.all(
      jobs.map(job => Job.create(job))
    ).then(
      jobs => {
        jobs.forEach(doer => {
          console.log(`Job ${doer.name} is created.`);
        });
        console.log(`Total jobs: ${jobs.length}.`);
        resolve(jobs);
      },
      err => reject(err)
    );

  });
}

function createTags() {
  let allTags = [];
  for(let i = 0; i < faker.random.number({min:100, max:200}); i++) {
    allTags[i] = faker.lorem.word();
  }
  allTags = _.uniq(allTags);
  return allTags;
}

function createResponses(responsed) {
  if (responsed === 0) return [];

  const responses = [];
  for (let i = 0; i < responsed; i++) {
    let doer = gDoers[faker.random.number({min:1, max:gDoers.length}) - 1]; // dubs possible

    let discussion = [];
    let postedAt = new moment(faker.date.recent());
    for(let i = 0; i < faker.random.number(10); i++) {
      discussion[i] = {
        text: faker.lorem.paragraph(),
        postedAt: postedAt.add(10, 'm').toDate(),
        isDoer: faker.random.boolean(),
      };
    }

    responses[i] = {
      text: faker.lorem.paragraph(),
      postedBy: doer._id,
      postedAt: faker.date.recent(),
      discussion: discussion
    };
  }

  return responses;
}

module.exports = generate;
