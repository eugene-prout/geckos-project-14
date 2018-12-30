import React, { Component } from 'react';

import 'bulma/css/bulma.css';

class Favourites extends Component {
    render() {
        return (

            <section class="column">
                <div class="box">
                    <h1 class="title">Favourite stocks</h1>

                    <table class="table is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Stock</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>ATVI</td>
                                <td>Activision Blizzard</td>
                                <td>$47.23</td>
                            </tr>

                            <tr>
                                <td>GOOG</td>
                                <td>Alphabet Inc</td>
                                <td>$1,036.58</td>
                            </tr>

                            <tr>
                                <td>ADBE</td>
                                <td>Adobe</td>
                                <td>$238.00</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default Favourites;