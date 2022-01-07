import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
      <div className='navbar'>
        <NavLink to="/">
          <li><a className='active'>Stocks Manager</a></li>
          <li style={{ float: "left", marginLeft: "100px" }}>
            <a>Dashboard</a>
          </li>
        </NavLink>
        <NavLink to="/about">
          <li><a>About</a></li>
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;