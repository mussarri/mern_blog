import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  async function registerPost(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
      alert(`${username} registered succesfully`);
    } else {
      setErrors(result.errors);
    }
  }

  return (
    <div className="col-lg-6 col-sm-8 mx-auto">
      <h2>Register</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <small>{errors.username ? errors.username.message : ""}</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small>{errors.email ? errors.email.message : ""}</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>{errors.password ? errors.password.message : ""}</small>
        </div>

        <button
          className="btn bg-dark-subtle text-primary-emphasis float-r"
          onClick={registerPost}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
