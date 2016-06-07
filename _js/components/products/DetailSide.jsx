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
          <img src={`${basename}/assets/img/products/product1.png`} />
          <div className="product-aside-info">
            <div>
              <h1>Artikel naam</h1>
              <h2>Categorie</h2>
            </div>
            <h3>12 punten</h3>
            <Link to="/product"><button className="btn-white">RESERVEER</button></Link>
          </div>
        </div>

        <hr/>

        <div className="basket-aside">
          <img src={`${basename}/assets/img/products/product1.png`} />
          <div className="product-aside-info">
            <div>
              <h1>Artikel naam</h1>
              <h2>Categorie</h2>
            </div>
            <h3>12 punten</h3>
            <Link to="/product"><button className="btn-white">RESERVEER</button></Link>
          </div>
        </div>

      </aside>
    );
  }
}
