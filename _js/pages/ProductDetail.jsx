'use strict';

import React, {Component, PropTypes} from 'react';
import {DetailSide} from '../components/products/';
import {basename} from '../globals';
import {selectProductsById} from '../api/products';
import {isEmpty, filter} from 'lodash';
import token from '../auth/token';
import {insert, selectByUserId} from '../api/orders';
import {update} from '../api/users';

import {Link} from 'react-router';

export default class ProductDetail extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props, context);
    this.state = {
      product: {},
      ordered: {}
    };
    window.scrollBy(0, -10000);
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

    let userid = token.content().user.id;

    selectByUserId(userid)
      .then(data => {
        this.setState({ordered: data});
      });
  }

  addToBasket(e){
    e.preventDefault();

    let data = [];
    data.productid = this.props.params.id;
    data.userid = token.content().user.id;

    let product = [];
    product[0] = this.state.product;
    product[0].product_id = data.productid;

    this.setState({ordered: product});

    insert(data);

    let currentPoints = parseInt(localStorage.points);
    currentPoints -= parseInt(product[0].price);
    localStorage.points = currentPoints;

    let user = [];
    user.id = token.content().user.id;
    user.points = localStorage.points;

    update(user);
  }

  renderMaten(){
    if(isEmpty(this.state.product)){
      return;
    }else {
      if(this.state.product.tags === 'Schoenen'){
        return (
        <div>
        <h2>Beschikbare maten</h2>
        <ul className="maten">
        <li>38</li>
        <li>39</li>
        <li className="maten-selected">40</li>
        <li>41</li>
        <li>42</li>
        <li>43</li>
        </ul>
        </div>
        );
      }
    }
  }

  renderButton(){
    if(!isEmpty(this.state.product)){
      let id = parseInt(this.props.params.id);

      let filteredResult = filter(this.state.ordered, o => parseInt(o.product_id) === id);

      if(isEmpty(filteredResult)){
        return (<div className="filterslider"><Link to="/product"><button className="btn-white" onClick={e => this.addToBasket(e)}>RESERVEREN</button></Link></div>);
      }else {
        return (<div className="filterslider"><Link to="/basket"><button className="btn-green">GERESERVEERD</button></Link></div>);
      }
    }
  }

  render(){
    let {product={id: this.props.params.id}} = this.state;


    return (
      <div className="productdetailpage">
        <DetailSide />

        <div className="productoverview">
          <Link to={`/shop/${product.store_id}`}><img src={`${basename}/assets/img/back.png`} className="backproductbtn"/></Link>
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

              {this.renderMaten()}

              <h2>Winkel</h2>
              <img src={`${basename}/assets/img/winkels/${product.logo}2.png`} />

              <h2>PUNTEN</h2>
              <p>{product.price} punten</p>

              {this.renderButton()}


            </div>
          </div>
        </div>
      </div>
    );
  }
}
