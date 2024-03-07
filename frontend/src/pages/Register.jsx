import React from "react";

function Register() {
  return (
    <div className="Register">
      <form>
        <h2>Sign up</h2>
        <input type="text" placeholder="Enter username here.." required />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter e-mail here.."
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password here.."
          required
        />
        <button type="submit">Create an account</button>
      </form>
    </div>
  );
}

export default Register;
