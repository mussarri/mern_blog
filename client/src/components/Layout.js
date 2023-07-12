import React, { useContext, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";

import { UserContext } from "../App";
import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4000",
});

function Layout() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function refresh() {
      instance
        .get("http://localhost:4000/refresh")
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            setUser({ username: response.data.decoded.username });
          } else {
            console.log(response);
          }
        })
        .catch(function (error) {
          // handle error
        });
    }
    refresh();
  }, []);

  const logoutHandler = (e) => {
    instance.get("/logout").then((res) => {
      console.log(res);
      if (res.status === 200) {
        setUser({});
      }
    });
  };

  const logout = () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => logoutHandler(),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  return (
    <>
      <header>
        <nav className="navbar p-3 bg-dark-subtle text-light">
          <div className="header-left">
            <Link className="navbar-brand" to="/">
              Navbar
            </Link>
          </div>
          {!user.username ? (
            <div className="header-right fs-6">
              <Link className="navbar-brand" to="/login">
                Login
              </Link>
              <Link className="navbar-brand" to="/register">
                Register
              </Link>
            </div>
          ) : (
            <Link className="navbar-brand" onClick={logout}>
              Logout
            </Link>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
