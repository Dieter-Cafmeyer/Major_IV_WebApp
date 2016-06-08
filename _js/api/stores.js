'use strict';
import fetch from 'isomorphic-fetch';
import {checkStatus} from '../util';
import token from '../auth/token';
import {basename} from '../globals/';

let base = `${basename}/api/stores`;

export const selectByStoreId = id => {

  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${base}/${id}`, {headers})
    .then(checkStatus);
};

export const selectAllStores = () => {
  return fetch(base)
    .then(checkStatus);
};

export default {
  selectByStoreId,
  selectAllStores
};
