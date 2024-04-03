import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { useAuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const { authLogout, setShowSettings, user } = useAuthContext();

  return (
    <div className="Navbar">
      <Link to="/" id="brand">
        <img src="/omniVerseLogo_6.png" alt="BrandLogo" />
      </Link>
      <SearchBar />
      <div className="navLinks">
        <div>
          <NavLink to="/music">Discover</NavLink>
          <NavLink to="/collections">Collections</NavLink>
        </div>
        <NavLink to={`/user/${user?.userName}`} id="Profile">
          <img
            src={
              user?.userPic ||
              "/Default4.png"
            }
            alt="user"
          />
        </NavLink>
        {user && (
          <ul className="userOptions">
            <li className="arrow">{/* <Link to="/user">Profile</Link> */}</li>

            <li>
              <Link onClick={() => setShowSettings(true)}>Settings</Link>
            </li>

            <li>
              <Link onClick={authLogout}>Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
