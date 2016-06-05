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
    var user = token.content().user;

    if(token.content()){
      return (
        <ul className="navigation-content">
          <div className="profile-info">
            <div className="profile-picture"></div>
            <h2 className="profile-name">{user.username}</h2>
            <h2 className="profile-points"><span>{user.points}</span> punten</h2>
          </div>
          <Link className="navigation-item" id="homeNav" to="/home"><li><p>Home</p></li></Link>
          <Link className="navigation-item kaartNav" to="/kaart"><li>Kaart</li></Link>
          {this.renderAdminLink()}
        </ul>
      );
    }
  }

  render(){



    if(this.props.isOpen){
      console.log('open');
    }

    return (
      <nav>
        {this.renderLoggedInLink()}
      </nav>
    );
  }
}
