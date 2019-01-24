import React, { Component } from 'react';
import 'bulma/css/bulma.css';

const Results = props => {
    return (
        <div class="box">
            <h2 class="subtitle">Search Results for {props.stock.ticker}:</h2>
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



                <input class="button" type="button" value="Add To Favourites" onClick={props.DaddtoFav}></input>


            </div>
        </div>
    )
}




class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            ticker: '',
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

    addToFav = () => {
        console.log("add fav called");
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    submitQuery = () => {
        this.props.querySub(this.state);
    }

    render() {
        const { ticker, price} = this.state
        const {show, stock} = this.props

        return (

            <section class="column is-three-quarters">
                <div class=" box">
                    <h1 class="title">Search for stock data</h1>
                    <form>
                        <div class="field is-grouped">
                            <p class="control is-expanded">
                                <input class="input" type="input" name="ticker"
                                 placeholder="Stock Ticker/Name"
                                    value={ticker} onChange={this.handleChange} ></input>
                            </p>

                            <p class="control">
                                <input class="button" type="button" value="Submit" onClick={this.submitQuery}></input>
                            </p>
                        </div>
                    </form>
                </div>
                { show ? <Results stock={stock} DaddtoFav={this.addToFav} /> : null }

            </section>
        );
    }
}

export default Dashboard;