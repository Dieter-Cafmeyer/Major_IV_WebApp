'use strict';

import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import token from '../auth/token';

let base = '/api/users';

export const insert = data => {

  let method = 'POST';
  let body = buildBody(data, ['username', 'password', 'email']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(base, {method, body, headers})
    .then(checkStatus);

};

export const selectAll = () => {

  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(base, {headers})
    .then(checkStatus);

};

export default {
  insert,
  selectAll
};
