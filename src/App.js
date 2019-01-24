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
  //   if (localStorage.getItem("stocks") == null){
  //     localStorage.setItem("stocks", "");
  // }
  
    
    // let value = localStorage.getItem("stocks");
    // value = JSON.parse(value);
    // this.setState({ stocks: value });

    this.interval = setInterval(() => {
      this.getPrice()
    }, 10000);

  }
  url = "";

  state = {
    stocks_list: [],
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
    const { stocks_list } = this.state;

    this.setState(({
      stocks_list: stocks_list.filter((stock, i) => {
        return i !== index;
      })
    }), function () {
     
    });
  }

  handleFavAdd = stock => {

    this.setState(({ stocks_list: [...this.state.stocks_list, stock] }), function () {
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


  getPrice = () => {
    console.log("getPrice called")
    const { stocks_list } = this.state
    var url = ""
    stocks_list.forEach((key, index) => {
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
          Object.keys(stocks_list).forEach(index => {

            if (stocks_list[index].ticker === ResponseStockName) {
              stocks_list[index].price = response[ResponseStockName].price;
            }
          })

        });

      })
      .then( () => {
        this.setState({
          stocks_list: stocks_list
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
            stocks={this.state.stocks_list}
            removeFavStock={this.removeFavourite}
            getPrice={this.getPrice}
          ></Favourites>
        </section>
      </div>
    );
  }
}

export default App;
