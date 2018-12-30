import React, { Component } from 'react';
import Favourites from './Favourites.js';
import 'bulma/css/bulma.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stockTicker: '',
            stocks: JSON.parse(localStorage.getItem('favourites'))
        };

        this.handleChange = this.handleChange.bind(this);
        this.addToFavourites = this.addToFavourites.bind(this);

    }

    handleChange(event) {
        this.setState({ stockTicker: event.target.value.toUpperCase() });
    }

    addToFavourites() {
        this.state.stocks.push(this.state.stockTicker);
        localStorage.setItem('favourites', JSON.stringify(this.state.stocks));
    }




    render() {
        return (

            <section class="column is-three-quarters">
                <div class=" box">
                    <h1 class="title">Search for stock data</h1>

                    <div class="field is-grouped">
                        <p class="control is-expanded">
                            <input class="input" type="text" placeholder="Stock Ticker/Name" value={this.state.value} onChange={this.handleChange} ></input>
                        </p>

                        <p class="control">
                            <input class="button" type="submit" value="Submit input"></input>
                        </p>
                    </div>

                    <div>
                        <h2 class="subtitle">Search Results for APPL:</h2>
                        <div class="table-container">
                            <table class="table is-narrow is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Query</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Ticker</td>
                                        <td>AAPL</td>
                                    </tr>

                                    <tr>
                                        <td>Name</td>
                                        <td>Apple Inc.</td>
                                    </tr>

                                    <tr>
                                        <td>Price</td>
                                        <td>$148.00</td>
                                    </tr>

                                    <tr>
                                        <td>Exchange</td>
                                        <td>Nasdaq Global Select</td>
                                    </tr>

                                    <tr>
                                        <td>Industry</td>
                                        <td>Computer Hardware</td>
                                    </tr>

                                    <tr>
                                        <td>Website</td>
                                        <td>www.apple.com</td>
                                    </tr>

                                </tbody>
                            </table>



                            <input class="button" onClick={this.addToFavourites} value="Add to favourites"></input>


                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;