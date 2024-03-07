import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/" id="brand">
        <h1>omniVerse</h1>
      </Link>
      <SearchBar />
      <div className="navLinks">
        <div>
          <NavLink to="/music">Discover</NavLink>
          <NavLink to="/collections">Collections</NavLink>
        </div>
        <NavLink to="/user" id="Profile">
          <img
            src="https://img.freepik.com/premium-vector/dj-wireless-music-headphones-silhouette-earphones-flat-icon-headset-silhouette-musician-equipment-vector-isolated-white-icon-emblem-clothing-print-design-element_981050-186.jpg"
            alt="user"
          />
        </NavLink>
        <ul className="userOptions">
          <li className="arrow">
            <Link to="/user">Profile</Link>
          </li>
          <li>
            <Link to="/">Settings</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
