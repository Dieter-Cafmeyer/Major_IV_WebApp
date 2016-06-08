'use strict';

import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import token from '../auth/token';
import {basename} from '../globals';
import {Link} from 'react-router';

var Menu = require('react-burger-menu').pushRotate;


export default class App extends Component {

  constructor(props, context){
    super(props, context);
  }

  renderNavigation(){

    let {pathname} = this.props.location;

    if(pathname === '/login') return '';
    if(pathname === '/register') return '';

    let {role} = token.content().user;
    let isOpen = false;

    return (
      <Menu width={350} isOpen={isOpen} onStateChange={this.isMenuOpen} customBurgerIcon={ <img className="burgerMenuLogo" src={`${basename}/assets/svg/closed.svg`}/> }>
        <Navigation role={parseInt(role)} pathname={pathname} />
      </Menu>
    );
  }

  rendericons(){
    let {pathname} = this.props.location;

    if(pathname === '/login') return '';
    if(pathname === '/register') return '';
    return (
      <div>
        <Link to="/basket"><img src={`${basename}/assets/svg/winkelmand.svg`} width="20"/>
        <p>Mijn winkelwagen</p></Link>
        <Link to="/logout"><img src={`${basename}/assets/svg/logout.svg`} width="20"/>
        <p>Log uit</p></Link>
      </div>
    );
  }

  isMenuOpen(state){
    var burgerMenuLogo = document.querySelector('.bm-icon');

    if(state.isOpen){
      burgerMenuLogo.setAttribute('src', `${basename}/assets/svg/opened.svg`);

    }else {
      burgerMenuLogo.setAttribute('src', `${basename}/assets/svg/closed.svg`);
    }
  }

  render() {

    let {children} = this.props;


    return (
      <div className='container'>
        <header className="navigation">
          <img className="logo" src={`${basename}/assets/svg/logo.svg`}/>
          {this.rendericons()}
        </header>

        {this.renderNavigation()}

        <main>
          {children}
        </main>

      </div>
    );

  }

}
