'use strict';

import React, {Component} from 'react';
import {DetailSide} from '../components/products/';
import {basename} from '../globals';
import {selectProductsById} from '../api/products';

import {Link} from 'react-router';

export default class ProductDetail extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      product: {}
    };
    window.scrollBy(0, -1000);
  }

  componentDidMount(){
    let id = this.props.params.id;

    selectProductsById(id)
      .then(data => {
        this.setState({product: data});
      })
      .catch(() => {
        console.error('failed to get store');
      });
  }


  render(){

    let {product={id: this.props.params.id}} = this.state;

    return (
      <div className="productdetailpage">
        <DetailSide />

        <div className="productoverview">
          <h1 className="producttitle">
            <img height="300" src={`${basename}/assets/img/products/${product.image}`} />
          </h1>

          <div className="productcontent">
            <div className="beschrijving">
              <h3>{product.tags}</h3>
              <h1>{product.name}</h1>
              <h2>BESCHRIJVING</h2>
              <p className="beschrijvingtekst">{product.description}</p>
            </div>

            <div className="details">
              <h1>DETAILS</h1>

              <h2>Beschikbare maten</h2>
              <ul className="maten">
                <li>38</li>
                <li>39</li>
                <li className="maten-selected">40</li>
                <li>41</li>
                <li>42</li>
                <li>43</li>
              </ul>

              <h2>Winkel</h2>
              <img src={`${basename}/assets/img/winkels/${product.logo}2.png`} />

              <h2>PUNTEN</h2>
              <p>{product.price} punten</p>

              <div className="filterslider"><Link to="/product"><button className="btn-white">RESERVEER</button></Link></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
