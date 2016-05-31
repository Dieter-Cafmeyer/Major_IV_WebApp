'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import token from '../auth/token';

export default class Navigation extends Component{

  static propTypes = {
    role: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired
  };

  constructor(props, context){
    super(props, context);
  }
  setActive(name){
    let {pathname} = this.props;

    return (`/${name}` === pathname) ? 'active' : '';
  }

  renderAdminLink(){
    let {role} = this.props;

    if(parseInt(role) !== 1) return '';
    return <Link className={this.setActive('admin')} to="/admin"><li className="navigation-item">Admin</li></Link>;
  }


  renderLoggedInLink(){
    if(token.content()){
      return (
        <ul className="navigation-content">
          <Link className="navigation-item" to="/home"><li><p>Home</p></li></Link>
          <Link className="navigation-item" to="/test"><li>Winkels</li></Link>
          <Link className="navigation-item" to="/test"><li>Mijn Producten</li></Link>
          {this.renderAdminLink()}
          <Link className="navigation-item" to="/test"><li>Account</li></Link>
          <Link className="navigation-item" to="/logout"><li>Logout</li></Link>
        </ul>
      );
    }else {
      return (
        <ul className="nav nav-pills">
          <li className={this.setActive('login')}><Link to="/login">Login</Link></li>
          <li className={this.setActive('register')}><Link to="/register">Register</Link></li>
        </ul>
      );
    }
  }

  render(){
    return (
      <nav>
        {this.renderLoggedInLink()}
      </nav>
    );
  }
}
