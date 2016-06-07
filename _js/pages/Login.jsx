'use strict';

import React, {Component, PropTypes} from 'react';
import {isEmpty} from 'lodash';

import {Link} from 'react-router';
import {login} from '../api/auth';

import token from '../auth/token';

export default class Login extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context){

    super(props, context);

    this.state = {
      email: '',
      password: '',
      error: ''
    };

  }

  changeHandler(){

    let {email, password} = this.refs;

    this.setState({
      email: email.value,
      password: password.value
    });

  }

  validate(){

    let {email, password} = this.state;

    let error = '';

    if(!email || !password){
      error = 'verkeerde email / paswoord';
    }

    return error;

  }

  submitHandler(e){

    e.preventDefault();

    let error = this.validate();

    if(isEmpty(error)){

      login(this.state)
        .then(t => token.set(t))
        .then(() => {
          this.context.router.push('/home');
        });

    }else{
      //errors op het scherm plaatsen
      this.setState({error, password: '', email: ''});
    }

  }

  render() {

    let {email, password, error} = this.state;

    return (
      <section className="login">
        <form className="login-form" action="" method="post" acceptCharset="utf-8" onSubmit={e => this.submitHandler(e)}>

          <ul className="tab-group">
            <Link to="/register"><li className="tab"><p>REGISTREER</p></li></Link>
            <li className="tab active"><p>LOG IN</p></li>
          </ul>

          <h2>Welkom terug!</h2>

          <fieldset>
            <label>Email</label>
            <input type="text" name="email" ref="email" value={email} onChange={() => this.changeHandler()}/>

            <label>Password</label>
            <input type="password" name="password" ref="password" value={password} onChange={() => this.changeHandler()}/>

            <div className='error'>{error}</div>

            <button type="submit">Log In</button>
          </fieldset>

        </form>
      </section>
    );
  }

}
