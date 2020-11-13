import React, { Component } from 'react';
import 'bulma/css/bulma.css';

const Results = props => {
    return (
        <div className="box">
            <h2 className="subtitle">Search Results for {props.stock.ticker}:</h2>
            <div className="table-container">
                <table className="table is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Query</th>
                            <th>Result</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Ticker</td>
                            <td>{props.stock.ticker}</td>
                        </tr>

                        <tr>
                            <td>Name</td>
                            <td>{props.stock.name}</td>
                        </tr>

                        <tr>
                            <td>Price</td>
                            <td>{"$" + props.stock.price.toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>{props.stock.description}</td>
                        </tr>

                        <tr>
                            <td>Exchange</td>
                            <td>{props.stock.exchange}</td>
                        </tr>

                        <tr>
                            <td>Sector</td>
                            <td>{props.stock.sector}</td>
                        </tr>

                        <tr>
                            <td>Industry</td>
                            <td>{props.stock.industry}</td>
                        </tr>

                        <tr>
                            <td>Website</td>
                            <td>{props.stock.website}</td>
                        </tr>

                    </tbody>
                </table>



                <input className="button" type="button" value="Add To Favourites" onClick={props.DaddtoFav}></input>


            </div>
        </div>
    )
}




class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            ticker: 'aapl',
            price: 123,
        };

        this.state = this.initialState

    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

    }

    getPrice = stock => {
        console.log("getPrice called from dashboard")
        var url = stock

        fetch("https://cloud.iexapis.com/stable/stock/" + url +"/batch?types=price&token=pk_c242de406ab6483493e292d64a4ed385")
            .then(results => {
                return results.json();
            })
            .then(function (response) {

                this.setState({
                    price: response
                });

            });


    }


    addToFav = () => {
        console.log("add fav called");
        this.setState({
            ticker: this.props.stock.ticker,
            price: this.props.stock.price
        }, function () {
            this.props.handleSubmit(this.state)


        });

    }

    submitQuery = () => {
        this.props.querySub(this.state);
    }

    render() {
        const { ticker } = this.state
        const { show, stock } = this.props

        return (

            <section className="column is-three-quarters">
                <div className=" box">
                    <h1 className="title">Search for stock data</h1>

                    <div className="field is-grouped">
                        <p className="control is-expanded">
                            <input className="input" type="input" name="ticker"
                                placeholder="Stock Ticker/Name"
                                value={ticker} onChange={this.handleChange} ></input>
                        </p>

                        <p className="control">
                            <input className="button" type="button" value="Submit" onClick={this.submitQuery}></input>
                        </p>
                    </div>

                </div>
                {show ? <Results stock={stock} DaddtoFav={this.addToFav} /> : null}

            </section>
        );
    }
}

export default Dashboard;
