import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';


import Header from './components/Header';
import Favourites from './components/Favourites';
import Dashboard from './components/Dashboard';

class App extends Component {

  constructor(props) {
    super(props);
    this.getPrice = this.getPrice.bind(this);
  } 


  componentDidMount() {
    let value = localStorage.getItem("stocks");
    value = JSON.parse(value);
    this.setState({ stocks : value }, function() {
      this.state.stocks.forEach((key, index) => {
        // return console.log(key.ticker)
        this.url += key.ticker + ","
    });


    this.getPrice();
    });

  }
  url = "";
  
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
this.getPrice()
    });
  }

  getPrice = () => {
    const {stocks} = this.state
    console.log(stocks)
    var url = ""
    stocks.forEach((key, index) => {
      // return console.log(key.ticker)
      url += key.ticker + ","
    });

    fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols=" + url + "&types=price")
    .then(results => {
      return results.json();
    })
    .then(function(response) {

      // loops over each stock in the response
      Object.keys(response).forEach(function(ResponseStockName,index) {
        // loops over saved stocks
        Object.keys(stocks).forEach(index => {

          if (stocks[index].ticker === ResponseStockName)
          {
            stocks[index].price = response[ResponseStockName].price;
          }
        })
        // Get the price of the stock
        // console.log(response[ResponseStockName].price);
        // // Gets the ticker of the stock
        // console.log(ResponseStockName);
         
        });
      

        // this.setState(this.state.stocks.key : response[key].price)

        // key: the name of the object key
        // index: the ordinal position of the key within the object 
    });
    this.setState(({stocks : stocks}), function (){
      localStorage.setItem("stocks", JSON.stringify(this.state.stocks))
    });
  

    
  }
      // return response;
    
  

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
