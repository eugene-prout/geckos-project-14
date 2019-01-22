import React, { Component } from 'react';
import 'bulma/css/bulma.css';

const Results = () => {
    return (
        <div class="box">
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



                <input class="button" value="Add to favourites"></input>


            </div>
        </div>
    )
}




class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            ticker: '',
            price: '',
        };

        this.state = this.initialState

    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
        
    }

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { ticker, price} = this.state

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
                                <input class="button" type="button" value="Submit" onClick={this.submitForm}></input>
                            </p>
                        </div>
                    </form>
                </div>
                <Results />

            </section>
        );
    }
}

export default Dashboard;