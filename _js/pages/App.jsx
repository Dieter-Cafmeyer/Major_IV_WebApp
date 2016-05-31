'use strict';

import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import token from '../auth/token';

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
      <Menu width={250} isOpen={isOpen} >
        <Navigation role={parseInt(role)} pathname={pathname} />
      </Menu>
    );
  }

  render() {

    let {children} = this.props;


    return (
      <div className='container'>
        <header className="navigation">
          <img className="logo" src="../../assets/svg/logo.svg"/>
        </header>

        {this.renderNavigation()}

        <main>
          {children}
        </main>

      </div>
    );

  }

}
