import { Link } from 'react-router-dom';

import './header.scss';

function Header() {
  return (
    <header className="header">Header

      <button><Link to="/">Contact list</Link></button>
      <button><Link to="/edit-contact">Edit contact</Link></button>
      <button><Link to="/new-contact">Add contact</Link></button>    
    </header>
  )
}

export default Header;
