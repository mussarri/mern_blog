import React, { useEffect, useState } from "react";
import { instance } from "../components/Layout";
import { useParams, Navigate } from "react-router-dom";

function SinglePost() {
  const [post, setPost] = useState({});
  const [error, setError] = useState();
  const { slug } = useParams();

  useEffect(() => {
    instance
      .get("/posts/" + slug)
      .then((res) => setPost(res.data.post))
      .catch((err) => setError(err));
  }, [slug]);

  if (post) {
    return (
      <div className="single-post col-lg-8 m-auto mt-4">
        <div className="img">
          <img src={"http://localhost:4000/upload/" + post.image} alt="" />
        </div>
        <h3 className="mt-3">
          <p>{post.title}</p>
        </h3>
        <div className="mt-3">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="text-right float-r">
          <button className="btn btn-warning me-3">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default SinglePost;
