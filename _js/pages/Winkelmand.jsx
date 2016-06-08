'use strict';

import React, {Component} from 'react';
import {BasketItem} from '../components/basket/';
import {selectAllOrders} from '../api/orders';
import token from '../auth/token';
import {isEmpty} from 'lodash';
import {remove} from '../api/orders';
import {filter} from 'lodash';
import {Link} from 'react-router';


export default class Winkelmand extends Component {
  constructor(props, context){
    super(props, context);
    window.scrollBy(0, -10000);
    this.state = {
      orders: {}
    };
  }

  deleteOrder(orderId) {
    let orders = filter(this.state.orders, o => o.id !== orderId);
    this.setState({orders});

    remove(orderId)
      .catch(() => {
        console.error('failed to delete garden');
      });
  }

  componentDidMount(){
    let id = token.content().user.id;

    selectAllOrders(id)
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
        return <BasketItem {...order} key={order.id} deleteOrder={id => this.deleteOrder(id)}/>;
      });
    }
  }

  calculateScore(){
    if(!isEmpty(this.state.orders)){

      let totalPrice = 0;

      for (var i = 0; i < this.state.orders.length; i++) {
        totalPrice += parseInt(this.state.orders[i].price);
      }

      return totalPrice;

    }else {
      return 0;
    }
  }

  render(){
    let message;

    if(this.state.orders.length === 0) {
      message= <p className="winkelinfo">Nog geen reserveringen geplaatst</p>;
    }else {
      message = <p className="winkelinfo">{this.state.orders.length} producten in winkelmand</p>;
    }

    return (
      <div className="winkelmand">
        <div className="winkelmand-content">
          {message}
          {this.renderBasketItems()}

          <div className="winkelmand-under">
            <Link to="/home"><button> &lt; TERUG NAAR HOME</button></Link>
            <p>Totaal: &nbsp;&nbsp; <span>{this.calculateScore()} punten</span></p>
          </div>

        </div>
      </div>
    );
  }
}
