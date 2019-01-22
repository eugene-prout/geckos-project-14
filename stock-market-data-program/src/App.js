import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';


import Header from './components/Header';
import Favourites from './components/Favourites';
import Dashboard from './components/Dashboard';

class App extends Component {


  componentDidMount() {
    let value = localStorage.getItem("stocks");
    value = JSON.parse(value);
    this.setState({ stocks : value });

  
  }
  

  state = {
    stocks: []
  };

  removeFavourite = index => {
    const {stocks} = this.state;

    this.setState(({
      stocks : stocks.filter((stock, i) => {
        return i !== index;
      })
    }), function (){
      localStorage.setItem("stocks", JSON.stringify(this.state.stocks))
    });
  }

  handleSubmit = stock => {
    this.setState(({stocks: [...this.state.stocks, stock]}), function (){
      localStorage.setItem("stocks", JSON.stringify(this.state.stocks))
    });



  }

  getPrice = ticker => {
    const data = fetch("https://api.iextrading.com/1.0/stock/" + ticker + "/price")
    .then(function(response) {
      return response;
    })
  return data;
  }

  render() {
    const {stocks} = this.state;
     
    return (
      <div className="component-wrapper">
      <Header></Header>
      <section class="columns is-4 section" style={{'padding-top': '1rem'}}>

      <Dashboard handleSubmit={this.handleSubmit}></Dashboard>
      <Favourites 
        stocks={stocks}
        removeFavStock={this.removeFavourite}
        getPrice={this.getPrice}
        ></Favourites>
      </section>
      </div>
    );
  }
}

export default App;
