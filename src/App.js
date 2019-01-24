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
    if (localStorage.getItem("stocks") == null){
      localStorage.setItem("stocks", "");
  }
  
    
    let value = localStorage.getItem("stocks");
    value = JSON.parse(value);
    this.setState({ stocks: value });

    this.interval = setInterval(() => {
      this.getPrice()
    }, 10000);

  }
  url = "";

  state = {
    stocks: [],
    show: false,
    query: {
      ticker: "Testing",
      name: "Apple Inc.",
      price: "123",
      exchange: "Nasdaq",
      industry: "Electronics",
      sector: "",
      website: "www.apple.com af",
      description: ""
    }
  };

  removeFavourite = index => {
    const { stocks } = this.state;

    this.setState(({
      stocks: stocks.filter((stock, i) => {
        return i !== index;
      })
    }), function () {
      localStorage.setItem("stocks", JSON.stringify(this.state.stocks))
    });
  }

  handleFavAdd = stock => {

    this.setState(({ stocks: [...this.state.stocks, stock] }), function () {
      this.getPrice()
    });
  }

  handleQuerySubmit = stock => {
    const {query} = this.state
    
    var url = "https://api.iextrading.com/1.0/stock/" + stock.ticker + "/batch?types=company,price";

    fetch(url)
    .then(results => {
      return results.json()
    })
    .then(function (response) {
      query.ticker = response.company.symbol
      query.name = response.company.companyName
      query.price = response.price
      query.exchange = response.company.exchange
      query.sector = response.company.sector
      query.industry = response.company.industry
      query.website = response.company.website
      query.description = response.company.description
      // console.log(this.state.query.exchange)
    })
      .then( () => {
        this.setState({
          query: query,
          show: true
        });
    })
  }

  query = stock => {

  }



  getPrice = () => {
    console.log("getPrice called")
    const { stocks } = this.state
    var url = ""
    stocks.forEach((key, index) => {
      // return console.log(key.ticker)
      url += key.ticker + ","
    });

    fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols=" + url + "&types=price")
      .then(results => {
        return results.json();
      })
      .then(function (response) {

        // loops over each stock in the response
        Object.keys(response).forEach(function (ResponseStockName, index) {
          // loops over saved stocks
          Object.keys(stocks).forEach(index => {

            if (stocks[index].ticker === ResponseStockName) {
              stocks[index].price = response[ResponseStockName].price;
            }
          })

        });

      })
      .then( () => {
        this.setState({
          stocks: stocks
        }, () => {
          localStorage.setItem("stocks", JSON.stringify(this.state.stocks))
        });
      });


  }

  render() {

    return (
      <div className="component-wrapper">
        <Header></Header>
        <section class="columns is-4 section" style={{ 'padding-top': '1rem' }}>

          <Dashboard 
            handleSubmit={this.handleFavAdd}
             show={this.state.show} 
             stock={this.state.query}
             querySub={this.handleQuerySubmit}
             ></Dashboard>
          <Favourites
            stocks={this.state.stocks}
            removeFavStock={this.removeFavourite}
            getPrice={this.getPrice}
          ></Favourites>
        </section>
      </div>
    );
  }
}

export default App;
