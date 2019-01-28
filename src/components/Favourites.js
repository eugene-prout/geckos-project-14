import React, { Component } from 'react';

import 'bulma/css/bulma.css';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Delete</th>
            </tr>
        </thead>
    )
}

const TableBody = props => {
    if (props.stocks == null){
return null
    }
    const rows = props.stocks.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.ticker}</td>
                
                <td>{"$" + row.price.toFixed(2)}</td>
                <td><input className="button" type="submit" value="X" onClick={() => props.removeFavStock(index)}></input></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>
    
}

class Favourites extends Component {


    render() {

        const {stocks, removeFavStock, getPrice } = this.props;



        return (
            <section className="column">
                <div className="box">
                    <h1 className="title">Favourite stocks</h1>

                    <table className="table is-narrow is-hoverable is-fullwidth">
                        <TableHeader />
                        <TableBody stocks={stocks} removeFavStock={removeFavStock} getPrice={getPrice}/>

                    </table>
                </div>
            </section>
        );
    }
}

export default Favourites;