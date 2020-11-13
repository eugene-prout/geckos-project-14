import React, { Component } from 'react';
import 'bulma/css/bulma.css';


import Header from './components/Header';
import Favourites from './components/Favourites';
import Dashboard from './components/Dashboard';

class BreakSignal { }


class App extends Component {

  constructor(props) {
    super(props);
    this.getPrice = this.getPrice.bind(this);

  }


  componentDidMount() {
    if (localStorage.getItem("stocks_list") != null) {
      let value = localStorage.getItem("stocks_list");
      value = JSON.parse(value);
      this.setState(({ stocks_list: value }), function () {
        this.getPrice()
      });
    }
    else {
      localStorage.setItem("stocks_list", JSON.stringify([]));
    }




    this.interval = setInterval(() => {
      this.getPrice()
    }, 5000);

  }
  url = "";

  state = {
    stocks_list: [],
    show: false,
    query: {
      ticker: "aapl",
      name: "Apple Inc.",
      price: "123",
      exchange: "Nasdaq",
      industry: "Electronics",
      sector: "",
      website: "www.apple.com af",
      description: ""
    },
    unknown_stock: false
  };

  removeFavourite = index => {
    const { stocks_list } = this.state;

    this.setState({
      stocks_list: stocks_list.filter((stock, i) => {
        return i !== index;
      })
    }, function () {
      localStorage.setItem("stocks_list", JSON.stringify(this.state.stocks_list))


    });
  }

  handleFavAdd = stock => {
    const { stocks_list } = this.state;
    let tickers = stocks_list.map(_stock => _stock.ticker);


    if (!(tickers.includes(stock.ticker))) {
      this.setState(({ stocks_list: [...this.state.stocks_list, stock] }), function () {
        localStorage.setItem("stocks_list", JSON.stringify(this.state.stocks_list))
        this.getPrice()

      });
    }
  }

  handleQuerySubmit = stock => {
    const { query } = this.state
    console.log("making req");
    var url = "https://cloud.iexapis.com/stable/stock/" + stock.ticker +"/batch?types=company,quote&token=pk_c242de406ab6483493e292d64a4ed385";
    // var url = "https://api.iextrading.com/1.0/stock/" + stock.ticker + "/batch?types=company,price";
    // "https://sandbox.iexapis.com/stable/stock/" + stock.ticker +"/batch?types=company,price&token=pk_c242de406ab6483493e292d64a4ed385"
    console.log(url);
    fetch(url)
      .then(results => {

        if (results.status === 404) {
          console.log("status bad")
          throw new BreakSignal()
        }
        return results.json()
      })
      .catch(BreakSignal, () => {
        console.log("break signal")
        this.setState({
          unknown_stock: true
        })
      })
      .then(function (response) {

        query.ticker = response.company.symbol
        query.name = response.company.companyName
        
        query.price = response.quote.latestPrice
        
        query.exchange = response.company.exchange
        query.sector = response.company.sector
        query.industry = response.company.industry
        query.website = response.company.website
        query.description = response.company.description
        // console.log(this.state.query.exchange)
      })
      .then(() => {
        this.setState({
          query: query,
          show: true
        })
      });


  }

  // 

  getIndivPrice = stock => {
    console.log("Get Individual Price Called " + stock)
    
    var indivStock = {...this.state.stocks_list[stock]}
console.log(indivStock);
    fetch("https://cloud.iexapis.com/stable/stock/" + stock.ticker +"/batch?types=price&token=pk_c242de406ab6483493e292d64a4ed385")
      .then(results => {
        return results.json();
      })
      .then(() => {

        this.setState({

        })

      });
    


  }


  getPrice = () => {
    console.log("getPrice called")
    const { stocks_list } = this.state
    var url = ""
    if (stocks_list.length !== 1) {
      url = stocks_list.map(e => e.ticker).join(",");
    } else {
      console.log(stocks_list);
      url = stocks_list[0].ticker;
    }


    let value = localStorage.getItem("stocks_list");
    value = JSON.parse(value); 
var outdated = false;

fetch("https://cloud.iexapis.com/stable/stock/market/batch?symbols=" + url + "&types=quote&token=pk_c242de406ab6483493e292d64a4ed385")
      .then(results => {
        return results.json();
      })
      .then(function (response) {
        // loops over each stock in the response
        Object.keys(response).forEach(function (ResponseStockName, index) {
          // loops over saved stocks
          Object.keys(stocks_list).forEach(index => {
            
            if (stocks_list[index].ticker === ResponseStockName) {
              stocks_list[index].price = response[ResponseStockName]["quote"].latestPrice;
              
              Object.keys(value).forEach(index => {
                if (value[index].ticker === stocks_list[index].ticker) {
                  if (value[index].price !== stocks_list[index].price)
                  {
                    outdated = true
                  }
                  
                }
              })
            }
          })

        });

      })
      .then(() => {
        this.setState({
          stocks_list: stocks_list
        }, () => {
          if (outdated) {
          localStorage.setItem("stocks_list", JSON.stringify(this.state.stocks_list))
          }
        });
      });


  }

  render() {

    return (
      <div className="component-wrapper">
        <Header></Header>
        <section className="columns is-4 section" style={{ 'paddingTop': '1rem' }}>

          <Dashboard
            handleSubmit={this.handleFavAdd}
            show={this.state.show}
            stock={this.state.query}
            querySub={this.handleQuerySubmit}
          ></Dashboard>

          {this.state.unknown_stock &&
            <h2>
              Unkown Stock
        </h2>
          }
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
