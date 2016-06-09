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
        })
        .catch(() => {
          let error = "verkeerde email / paswoord";
          this.setState({error, password: ''});
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

          <h1>Log In</h1>

          <h2>Of <Link to="/register"><span>registreer</span></Link> een nieuw account</h2>

          <fieldset>
            <input type="text" name="email" ref="email" placeholder="Email" value={email} onChange={() => this.changeHandler()}/>

            <input type="password" name="password" placeholder="Wachtwoord" ref="password" value={password} onChange={() => this.changeHandler()}/>

            <div className='error'>{error}</div>

            <button type="submit">Log In</button>
          </fieldset>

        </form>
      </section>
    );
  }

}
