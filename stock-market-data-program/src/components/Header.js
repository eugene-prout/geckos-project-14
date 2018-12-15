import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import 'bulma/css/bulma.css';

class Header extends Component {
  render() {
    return(
      <div className='navbar is-dark'>   
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>STOCK CHECK</Link>
        </div>

        <div className='navbar-end'>
          <Link to='/' className='navbar-item'>ABOUT</Link>
        </div>
      </div>
    );
  }
}

export default Header;