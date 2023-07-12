import React from "react";
import Blog from "../components/Blog";

function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <section className="posts">
        <h3 className="m-1">Last Blogs</h3>
        <Blog />
        <Blog />
      </section>
    </>
  );
}

export default Home;
