'use strict';

import React, {Component} from 'react';
//import token from '../auth/token';
//import renderRole from '../util/renderRole';
import {Link} from 'react-router';
import {selectAllStores} from '../api/stores';

import {Beoordeling, Store} from '../components/home/';

export default class Home extends Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      stores: []
    };
  }

  componentDidMount(){
    selectAllStores()
    .then(data => {
      this.setState(data);
    });
  }


  renderStores() {
    return this.state.stores.map(store => {
      return <Store {...store} key={store.id}/>;
    });
  }

  render(){
    return (

      <section className='home'>

        <div className="home-pt1">
          <div className="info">
            <h1>Hoogstraat Schiedam,<br/> ‘s werelds grootste kleerkast</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut enim ornare, pharetra ipsum quis, aliquet tortor. Donec ut dictum sapien. Integer aliquet felis at viverra iaculis.</p>
            <Link to="/kaart"><button className="btn-black">Kaart</button></Link>
          </div>

          <Beoordeling/>
        </div>

        <h1 className="main-title">De Winkels</h1>

        <div className="winkels">

          {this.renderStores()}

        </div>

      </section>
    );
  }
}
