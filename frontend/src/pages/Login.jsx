import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="Login">
      <form>
        <h2>Login</h2>
        <input type="email" name="email" id="email" placeholder="Enter e-mail here.." required />
        <input type="password" name="password" id="password" placeholder="Enter password here.." required />
        <button type="submit">Login</button>
        <p>You don't have account? <Link to="/register">Sign-up now</Link></p>
      </form>
    </div>
  );
}

export default Login;
