import React from "react";
import Blog from "../components/Blog";

function BlogPage() {
  return (
    <>
      <section className="posts">
        <h3 className="m-1">BLOGS</h3>
        <Blog />
      </section>
    </>
  );
}

export default BlogPage;
