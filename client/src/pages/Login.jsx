import React, { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../App";

function Login() {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    axios
      .post(
        "http://localhost:4000/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUser({ auth: true, username: "ali" });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          if (err.response.status === 401) setErrors("Invalid credentials");
          else setErrors("Please try again.");
        }
      });
  };

  return (
    <div className="col-lg-6 col-sm-8 mx-auto">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn bg-dark-subtle text-primary-emphasis float-r"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
