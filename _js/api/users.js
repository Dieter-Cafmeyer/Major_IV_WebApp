'use strict';

import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import token from '../auth/token';
import {basename} from '../globals/';

let base = `${basename}/api/users`;

export const insert = data => {

  let method = 'POST';
  let body = buildBody(data, ['firstname', 'username', 'password', 'email', 'phone', 'points']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(base, {method, body, headers})
    .then(checkStatus);

};

export const selectByUserId = id => {

  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${base}/${id}`, {headers})
    .then(checkStatus);
};

export const selectAll = () => {

  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(base, {headers})
    .then(checkStatus);

};

export default {
  insert,
  selectByUserId,
  selectAll
};
