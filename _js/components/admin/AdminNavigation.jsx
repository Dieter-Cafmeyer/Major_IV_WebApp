'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

export default class AdminNavigation extends Component{

  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <nav>
        <ul className="nav nav-pills">
          <li><Link to="/test">Users</Link></li>
          <li><Link to="/test">Winkels</Link></li>
          <li><Link to="/test">Orders</Link></li>
        </ul>
      </nav>
    );
  }
}
