import React, { useContext, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../App";
import axios from "axios";

function Layout() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function refresh() {
      axios
        .get("http://localhost:4000/refresh", { withCredentials: true })
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            setUser({ username: response.data.decoded.username });
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
    refresh();
  });

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
            <Link className="navbar-brand" to="/logout">
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
