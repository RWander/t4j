/* This module for NODE only! */

const fetch = require('node-fetch');

const env = process.env.NODE_ENV;
const config = require(`../config/${env ? env : 'development'}`);

const backendUrl = config.BACKEND.replace(/"/g,'');

export function getInitData(next) {
  _backendGET(
    'data',
    // success
    res => next(null, res.data),
    // fail
    err => next(err)
  );
}

function _backendGET(serverMethod, success, fail) {
  return fetch(`${backendUrl}/${serverMethod}`)
    .then(response => response.json())
    .then(success)
    .catch(fail);
}
