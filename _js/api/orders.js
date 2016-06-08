'use strict';

//isomorphic kan je ook gebruiken op de server
import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import token from '../auth/token';
import {basename} from '../globals/';

let base = `${basename}/api/orders`;

export const selectByProductId = id => {

  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${base}?productid=${id}`, {headers})
    .then(checkStatus);
};

export const selectByUserId = id => {

  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${base}?userid=${id}`, {headers})
    .then(checkStatus);
};

export const selectAllOrders = id => {
  return fetch(`${base}?basket=${id}`)
    .then(checkStatus);
};

export const insert = data => {
  let method = 'POST';
  let body = buildBody(data, ['productid', 'userid']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(base, {method, body, headers})
    .then(checkStatus);
};

export const remove = id => {
  let method = 'DELETE';
  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${base}/${id}`, {method, headers})
    .then(checkStatus);
};

export default {
  selectByProductId,
  selectByUserId,
  selectAllOrders,
  insert,
  remove
};
