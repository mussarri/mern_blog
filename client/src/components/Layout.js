import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <main className="mt-5">
        <header>
          <nav class="navbar p-3 bg-dark-subtle text-light">
            <div class="header-left">
              <Link class="navbar-brand" to="/">
                Navbar
              </Link>
            </div>
            <div class="header-right fs-6">
              <Link class="navbar-brand" to="/login">
                Login
              </Link>
              <Link class="navbar-brand" to="/register">
                Register
              </Link>
            </div>
          </nav>
        </header>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
