'use strict';

import React, {Component} from 'react';
import {basename} from '../../globals';
import token from '../../auth/token';
import {update} from '../../api/users';

export default class BasketItem extends Component {
  constructor(props, context){
    super(props, context);
  }

  deleteClicked(e) {
    e.preventDefault();
    this.props.deleteOrder(this.props.id);

    let currentPoints = parseInt(localStorage.points);
    currentPoints += parseInt(this.props.price);
    localStorage.points = currentPoints;

    let user = [];
    user.id = token.content().user.id;
    user.points = localStorage.points;

    update(user);
  }

  render(){
    return (
      <div className="basket-item">
        <div><img height="200" src={`${basename}/assets/img/products/${this.props.image}`} /></div>
        <p className="product-title">{this.props.name}</p>
        <p className="product-points">{this.props.price} punten</p>
        <img width="30" alt="verwijderen" className="delete-btn" onClick={e => this.deleteClicked(e)} src={`${basename}/assets/svg/opened.svg`}/>
      </div>
    );
  }
}
