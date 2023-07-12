import React from "react";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div className="post">
      <img
        src="https://images.pexels.com/photos/17018324/pexels-photo-17018324/free-photo-of-peyzaj-alan-hayvan-tarim.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
      />
      <div>
        <Link to={"blogs/id"}>
          <h2 className="fw-blod">Free photo of peyzaj alan hayvan tarim</h2>
        </Link>
        <div className="my-2">
          <span className="fw-bold">Yazar </span>
          <span>23.03.2022</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </p>
        <Link to={"blogs/id"} className="float-r">
          Read more...
        </Link>
      </div>
    </div>
  );
}

export default Blog;
