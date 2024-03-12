import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { useAuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const { authLogout, setShowSettings, user } = useAuthContext();

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
            src={
              user?.userPic ||
              "https://img.freepik.com/premium-vector/dj-wireless-music-headphones-silhouette-earphones-flat-icon-headset-silhouette-musician-equipment-vector-isolated-white-icon-emblem-clothing-print-design-element_981050-186.jpg"
            }
            alt="user"
          />
        </NavLink>
        <ul className="userOptions">
          <li className="arrow">{/* <Link to="/user">Profile</Link> */}</li>
          {user && (
            <li>
              <Link onClick={() => setShowSettings(true)}>Settings</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <Link onClick={authLogout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
