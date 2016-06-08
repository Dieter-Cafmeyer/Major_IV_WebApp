'use strict';

import React, {Component} from 'react';
import {BasketItem} from '../components/basket/';
import {selectAllOrders} from '../api/orders';
import token from '../auth/token';
import {isEmpty} from 'lodash';

export default class Winkelmand extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      orders: {}
    };
  }

  componentDidMount(){
    let id = token.content().user.id;

    selectAllOrders()
      .then(data => {
        this.setState({orders: data});
      })
      .catch(() => {
        console.error('failed to get orders');
      });
  }

  renderBasketItems(){
    if(!isEmpty(this.state.orders)){
      return this.state.orders.map(order => {
        return <BasketItem {...order} key={order.id}/>;
      });
    }
  }

  render(){
    let message;

    if(this.state.orders.length === 0) {
      message= <p>Nog geen reserveringen geplaatst</p>;
    }

    return (
      <div className="winkelmand">
        <div>Winkelmand</div>
        {message}
        {this.renderBasketItems()}
      </div>
    );
  }
}
