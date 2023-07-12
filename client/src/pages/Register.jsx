import React, { useState } from "react";
import { instance } from "../components/Layout";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  async function registerPost(e) {
    e.preventDefault();
    const res = await instance.post("/register", {
      username,
      password,
      email,
    });
    console.log(res);
    if (res.status === 200) {
      alert(`${res.data.username} registered succesfully`);
      navigate("/login");
    } else {
      setErrors(res.errors);
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
          <small>{errors?.username ? errors.username.message : ""}</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small>{errors?.email ? errors.email.message : ""}</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>{errors?.password ? errors.password.message : ""}</small>
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
