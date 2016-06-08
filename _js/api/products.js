'use strict';
import fetch from 'isomorphic-fetch';
import {checkStatus} from '../util';
import token from '../auth/token';
import {basename} from '../globals/';

let base = `${basename}/api/products`;

export const selectProductsById = id => {

  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${base}?productid=${id}`, {headers})
    .then(checkStatus);
};

export const selectProductsByStoreId = id => {

  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${base}?storeid=${id}`, {headers})
    .then(checkStatus);
};

export const selectAllStores = () => {
  return fetch(base)
    .then(checkStatus);
};

export default {
  selectProductsById,
  selectProductsByStoreId,
  selectAllStores
};
