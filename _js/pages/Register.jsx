'use strict';

import React, {Component, PropTypes} from 'react';
import {isEmpty} from 'lodash';
import {Link} from 'react-router';

import {insert} from '../api/users';
import {login} from '../api/auth';

import token from '../auth/token';

export default class Register extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context){

    super(props, context);

    this.state = {
      email: '',
      password: '',
      username: ''
    };

  }

  changeHandler(){

    let {email, username, password} = this.refs;

    this.setState({
      email: email.value,
      username: username.value,
      password: password.value
    });

  }

  validate(){

    let {email, password, username} = this.state;

    let errors = {};

    if(!email){
      errors.email = 'please enter the email';
    }

    if(!password){
      errors.password = 'please enter the password';
    }

    if(!username){
      errors.username = 'please enter the username';
    }

    return errors;

  }


  submitHandler(e){
    e.preventDefault();

    let errors = this.validate();

    if(isEmpty(errors)){

      insert(this.state)
        .then(() => login(this.state))
        .then(t => token.set(t))
        .then(() => {
          this.context.router.push('/home');
        });

    }else{
      //errors op het scherm plaatsen
      this.setState({errors, password: ''});
    }

  }

  render() {

    let {username, email, password, errors={}} = this.state;

    return (
      <section className="register">

        <form className="register-form" action="" method="post" acceptCharset="utf-8" onSubmit={e => this.submitHandler(e)}>

          <ul className="tab-group">
            <li className="tab active"><p>REGISTREER</p></li>
            <Link to="/login"><li className="tab"><p>LOG IN</p></li></Link>
          </ul>

          <h2>Begin hier!</h2>

          <fieldset>
            <label>Gebruiker</label>
            <input type="text" name="username"
              ref="username"
              value={username}
              onChange={() => this.changeHandler()}
              className={errors.username ? 'error' : ''}/>
            <label>Email</label>
            <input type="text" name="email"
              ref="email"
              value={email}
              onChange={() => this.changeHandler()}
              className={errors.email ? 'error' : ''}/>
            <label>Paswoord</label>
            <input type="password" name="password"
              ref="password"
              value={password}
              onChange={() => this.changeHandler()}
              className={errors.password ? 'error' : ''}/>
              <br/>
            <button type="submit" className="btn">Registreer</button>
          </fieldset>

        </form>

      </section>
    );
  }

}
