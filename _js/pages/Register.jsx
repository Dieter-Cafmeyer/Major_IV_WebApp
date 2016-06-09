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
      username: '',
      phone: '',
      points: '',
      errors: ''
    };

  }

  changeHandler(){

    let {email, username, password, phone, points} = this.refs;

    this.setState({
      email: email.value,
      username: username.value,
      phone: phone.value,
      points: points.value,
      password: password.value
    });

  }

  validate(){

    let {email, password, username, phone, points} = this.state;

    let errors = {};

    if(!email){
      errors.email = 'vul een email adres in';
    }

    if(!username){
      errors.username = 'vul uw naam in';
    }

    if(!password){
      errors.password = 'kies uw wachtwoord';
    }

    if(!phone){
      errors.phone = 'vul uw telefoon nummer in';
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
        })
        .catch(() => {
          errors.emailused = "email adres reeds in gebruik";
          this.setState({errors, password: ''});
        });


    }else{
      //errors op het scherm plaatsen
      this.setState({errors, password: ''});
    }

  }

  render() {

    let {username, phone, email, password, points, errors={}} = this.state;



    return (
      <section className="register">

        <form className="register-form" action="" method="post" acceptCharset="utf-8" onSubmit={e => this.submitHandler(e)}>
          <h1>Registreer een nieuw account</h1>
          <h2>Hebt u al een <Link to="/login"><span>account</span></Link>?</h2>
          <fieldset>
            <div className="register-content">

              <div>
                <input type="text" name="email" tabIndex="1" placeholder="Email" ref="email" value={email}
                  onChange={() => this.changeHandler()} className={errors.email || errors.emailused ? 'error' : ''}/>
                  <p className='error'>{errors.email}{errors.emailused}</p>
                <input type="password" name="password" tabIndex="3" placeholder="Wachtwoord" ref="password" value={password}
                  onChange={() => this.changeHandler()} className={errors.password ? 'error' : ''}/>
                  <p className='error'>{errors.password}</p>
              </div>

              <div>
                <input type="text" name="name" tabIndex="2" placeholder="Voornaam Naam" ref="username" value={username}
                  onChange={() => this.changeHandler()} className={errors.username ? 'error' : ''}/>
                  <p className='error'>{errors.username}</p>
                <input type="text" name="phone" tabIndex="4" placeholder="Telefoon" ref="phone" value={phone}
                  onChange={() => this.changeHandler()} className={errors.phone ? 'error' : ''}/>
                  <p className='error'>{errors.phone}</p>
              </div>
            </div>

            <select name="points" ref="points" value={points} onChange={() => this.changeHandler()} className={errors.points ? 'error' : ''}>
              <option value="50">€25 - 50punten</option>
              <option value="200">€65 - 200</option>
              <option value="500">€150 - 500punten</option>
            </select>

            <button type="submit" className="btn">Registreer</button>
          </fieldset>
        </form>

      </section>
    );
  }

}
