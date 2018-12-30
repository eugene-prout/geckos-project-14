import React, { Component } from 'react';

import './App.css';
import 'bulma/css/bulma.css';


import Header from './components/Header';
import Favourites from './components/Favourites';
import Dashboard from './components/Dashboard';

class App extends Component {
  
  render() {
    return (
      <div className="component-wrapper">
      <Header></Header>
      <section class="columns is-4 section" style={{'padding-top': '1rem'}}>
      <Dashboard></Dashboard>
      <Favourites></Favourites>
      </section>
      </div>
    );
  }
}

export default App;
