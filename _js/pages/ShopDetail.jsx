'use strict';

import React, {Component} from 'react';
import {selectByStoreId} from '../api/stores';
import {selectProductsByStoreId} from '../api/products';
import {ArticleDetail} from '../components/shop';
import {Filter} from '../components/shop/';

import {basename} from '../globals';
import {Link} from 'react-router';

export default class ShopDetail extends Component {
  constructor(props, context){
    props.params.id = parseInt(props.params.id);
    super(props, context);
    this.state = {
      products: []
    };
    window.scrollBy(0, -1000);
  }

  componentDidMount(){
    let id = this.props.params.id;

    selectByStoreId(id)
      .then(data => {
        this.setState({store: data});
      })
      .catch(() => {
        console.error('failed to get store');
      });

    selectProductsByStoreId(id)
      .then(data => {
        this.setState({products: data});
      })
      .catch(() => {
        console.error('failed to get products');
      });
  }

  renderProducts() {
    return this.state.products.map(product => {
      return <ArticleDetail {...product} key={product.id}/>;
    });
  }

  render(){
    let {store={id: this.props.params.id}} = this.state;

    return (
      <div className="shopdetailpage">
        <Filter/>

        <div className="shopdetail-right">
          <h1 className="shoptitle">{store.name}</h1>

          <div className="shopdetail-content">

            {this.renderProducts()}

         </div>
        </div>

      </div>


    );
  }
}

/*

*/
