'use strict';

import React, {Component} from 'react';
import {basename} from '../../globals';

import {Link} from 'react-router';

export default class DetailSide extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <aside>
        <h1>Suggesties</h1>

        <div className="basket-aside">
          <img src={`${basename}/assets/img/products/adidas/product2.png`} />
          <div className="product-aside-info">
            <div>
              <h1>Adidas OriginalsVeritas</h1>
              <h2>Schoenen</h2>
            </div>
            <h3>15 punten</h3>
            <Link to="/product"><button className="btn-white">RESERVEER</button></Link>
          </div>
        </div>

        <hr/>

        <div className="basket-aside">
          <img src={`${basename}/assets/img/products/nike/product1.png`} />
          <div className="product-aside-info">
            <div>
              <h1>Nike Sweatvest</h1>
              <h2>Sweatvest</h2>
            </div>
            <h3>8 punten</h3>
            <Link to="/product"><button className="btn-white">RESERVEER</button></Link>
          </div>
        </div>

      </aside>
    );
  }
}
