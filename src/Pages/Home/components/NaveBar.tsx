import React from 'react';


const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="SingIn">
        <a href="#">Sing In</a>
      </div>
      <ul className="nav-links">
        <li><a href="#history">History</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
