'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {selectByUserId} from '../api/users';
import token from '../auth/token';

export default class Navigation extends Component{

  static propTypes = {
    role: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired
  };

  constructor(props, context){
    super(props, context);
    this.state = {
      user: []
    };
  }
  setActive(name){
    let {pathname} = this.props;

    return (`/${name}` === pathname) ? 'active' : '';
  }

  componentDidMount(){
    let id = token.content().user.id;

    selectByUserId(id)
      .then(data => {
        this.setState({user: data});
      })
      .catch(() => {
        console.error('failed to get store');
      });
  }

  renderAdminLink(){
    let {role} = this.props;

    if(parseInt(role) !== 1) return '';
    return <Link className={this.setActive('admin')} to="/admin"><li className="navigation-item">Admin</li></Link>;
  }

  renderLoggedInLink(){
    var tokenuser = token.content().user;
    let {user={id: this.props.params.id}} = this.state;


    if(token.content()){
      return (
        <ul className="navigation-content">
          <div className="profile-info">
            <div className="profile-picture"></div>
            <h2 className="profile-name">{tokenuser.username}</h2>
            <h2 className="profile-points"><span>{user.points}</span> punten</h2>
          </div>
          <Link className="navigation-item" id="homeNav" to="/home"><li><p>Home</p></li></Link>
          <Link className="navigation-item kaartNav" to="/kaart"><li>Kaart</li></Link>
          <Link className="navigation-item kaartNav" to="/basket"><li>Winkelwagen</li></Link>
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
