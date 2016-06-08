'use strict';

import React, {Component} from 'react';
import {selectAll} from '../api/users';
import {Users, AdminNavigation} from '../components/admin/';

export default class Admin extends Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      users: []
    };
  }
  componentDidMount(){
    selectAll()
    .then(({users}) => this.setState({users}));
  }
  render(){
    let {users} = this.state;

    return (
      <section className='admin'>

        <header>
          <h2>Admin</h2>
        </header>

        <AdminNavigation />
        <Users users={users} />
      </section>
    );
  }
}
