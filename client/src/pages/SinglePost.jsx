import React, { useEffect, useState } from "react";
import { instance } from "../components/Layout";
import { useParams, Navigate, Link } from "react-router-dom";

function SinglePost() {
  const [post, setPost] = useState({});
  const [error, setError] = useState();
  const { slug } = useParams();

  console.log(error);

  useEffect(() => {
    instance
      .get("/posts/" + slug)
      .then((res) => setPost(res.data.post))
      .catch((err) => setError(err));
  }, [slug]);

  if (post) {
    return (
      <div className="single-post col-lg-8 m-auto mt-4">
        <h2 className="mt-3 text-center fw-bold">
          {post.title}
        </h2>
        <div className="img mt-3">
          <img src={"http://localhost:4000/upload/" + post.image} alt="" />
        </div>

        <div className="mt-3">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="text-right float-r">
          <Link to={"/edit/" + post.slug}>
            <button className="btn btn-warning me-3">Edit</button>
          </Link>
          <Link to={"/delete/" + post.slug}>
            <button className="btn btn-danger">Delete</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default SinglePost;
