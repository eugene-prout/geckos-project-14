import React, { Component } from 'react';

import 'bulma/css/bulma.css';

class Favourites extends Component {

     readFavourites() {
        return JSON.parse(localStorage.getItem('favourites'));
    }

    render() {
        return (

            <section class="column">
                <div class="box">
                    <h1 class="title">Favourite stocks</h1>

                    <table class="table is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.readFavourites() != null &&
                                
                                    this.readFavourites().map(
                                        (stock) =>
                                            <tr>
                                                <td>{stock}</td>
                                                <td>$47.23</td>
                                            </tr>

                                    )
                                
                            }



                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default Favourites;