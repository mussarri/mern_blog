import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { instance } from "../components/Layout";
import { UserContext } from "../App";

function Create() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});

  const [errors, setErrors] = useState({});
  const { user } = useContext(UserContext);

  function createPostHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("image", image);

    instance
      .post("/create", formData)
      .then((res) => {
        setErrors({});
        if (res.status === 200) {
          alert("Post created successfully");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        if (err.response.data.code === 11000) {
          setErrors({ message: "Duplicate key error" });
        } else {
          console.log(err.message);
          setErrors(err.response.data.errors);
        }
      });
  }

  if (!user.username) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      {errors.message ? (
        <div className="alert alert-danger col-lg-6">{errors.message}</div>
      ) : (
        ""
      )}
      <form className="col-lg-6">
        <h3>Create New Post</h3>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title ? <small>{errors.title.message}</small> : ""}
        </div>
        <div className="mb-3">
          <label className="form-label">Summary</label>
          <input
            type="text"
            className="form-control"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          {errors.summary ? <small>{errors.summary.message}</small> : ""}
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {errors.image ? <small>{errors.image.message}</small> : ""}
        </div>
        <div className="mb-3">
          <ReactQuill
            value={content}
            onChange={(newValue) => setContent(newValue)}
          />
          {errors.content ? <small>{errors.content.message}</small> : ""}
        </div>
        <button
          onClick={createPostHandler}
          className="btn bg-dark-subtle float-r w-100"
        >
          Post
        </button>
      </form>
    </>
  );
}

export default Create;
