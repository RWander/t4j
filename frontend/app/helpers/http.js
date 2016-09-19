/* global BACKEND */

import 'whatwg-fetch';

export function backendGET(serverMethod, success, fail) {
  return fetch(`${BACKEND}/${serverMethod}`)
    .then(response => response.json())
    .then(success)
    .catch(fail);
}
