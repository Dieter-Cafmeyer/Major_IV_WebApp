'use strict';

import React, {Component} from 'react';
import token from '../auth/token';
import renderRole from '../util/renderRole';

export default class Home extends Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      id: '',
      username: '',
      role: '',
      email: ''
    };
  }

  componentDidMount(){
    this.setState({...token.content().user});
  }

  render(){

    let {id, username, role} = this.state;

    return (
      <section className='home'>

        <header>
          <h2>Home</h2>
        </header>

        <p>Welkom {renderRole(role)} {username} met als id: {id}</p>

      </section>
    );
  }
}
