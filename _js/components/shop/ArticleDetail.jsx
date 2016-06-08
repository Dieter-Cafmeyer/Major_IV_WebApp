'use strict';

import React, {Component} from 'react';
import {basename} from '../../globals';
import {Link} from 'react-router';

export default class ArticleDetail extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){

    let {id, name, price, image, tags} = this.props;

    return (
      <article>
        <div className="standardimg">
          <img src={`${basename}/assets/img/products/${image}`} />
        </div>

        <h1>{name}</h1>
        <h2>{tags}</h2>
        <h3>{price} punten</h3>
        <div className="filterslider"><Link to={`/product/${id}`}><button className="btn-white">BEKIJKEN</button></Link></div>
      </article>
    );
  }
}
