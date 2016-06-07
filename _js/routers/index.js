'use strict';

import React from 'react';
import {Router, Route, IndexRedirect, useRouterHistory}
  from 'react-router';
import {createHistory} from 'history';
//import {renderRole} from '../util/renderRole';

import {App, Home, Login, Register, Admin, Kaart, ShopDetail, ProductDetail} from '../pages/';
import {basename} from '../globals/';

import token from '../auth/token';

const logout = (nextState, replace) => {
  if(token.clear()){
    replace({pathname: '/login'});
  }
};

const isLoggedIn = (nextState, replace) => {
  if(!token.isValid()) token.clear();

  if(!token.content()){
    replace({pathname: '/login'});
  }
};

const isAdmin = (nextState, replace) => {
  isLoggedIn(nextState, replace);
  if(token.content()){
    let {user} = token.content();
    if(parseInt(user.role) !== 1){
      replace({pathname: '/home'});
    }
  }
};

export default () => {

  return (

    <Router history={useRouterHistory(createHistory)({basename})}>

      <Route path="/" component={App}>
        <IndexRedirect to="home"/>
        <Route path="home" component={Home} onEnter={isLoggedIn}/>
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
        <Route path="product/:id" component={ProductDetail} onEnter={isLoggedIn}/>
        <Route path="kaart" component={Kaart} onEnter={isLoggedIn}/>
        <Route path="shop/:id" component={ShopDetail} onEnter={isLoggedIn}/>
        <Route path="register" component={Register}/>
        <Route path="admin" component={Admin} onEnter={isAdmin}/>
        <Route path="logout" onEnter={logout}/>
      </Route>

    </Router>

  );

};
