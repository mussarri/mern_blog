import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../components/Layout";


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    instance
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(`User logined succesfully`);
          // setUser({ username: `${res.data.isUser.username}` });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
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
