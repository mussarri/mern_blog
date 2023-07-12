import React from "react";
import { Link } from "react-router-dom";

function Blog({ post }) {
  return (
    <div className="post">
      <img src={"http://localhost:4000/upload/" + post.image} alt="" />
      <div>
        <Link to={"posts/" + post.slug}>
          <h3 className="fw-blod">{post.title}</h3>
        </Link>
        <div className="my-2">
          <span className="fw-bold">Yazar </span>
          <span>23.03.2022</span>
        </div>
        <p>{post.summary}</p>
        <Link to={"posts/" + post.slug} className="float-r">
          Read more...
        </Link>
      </div>
    </div>
  );
}

export default Blog;
