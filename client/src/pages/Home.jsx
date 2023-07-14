import React, { useState } from "react";
import Blog from "../components/Blog";
import { useEffect } from "react";
import { instance } from "../components/Layout";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    instance
      .get("/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <section className="posts">
        <h3 className="my-1">Last Blogs</h3>
        {posts.length < 1
          ? "No post"
          : posts.map((post, i) => <Blog post={post} />)}
      </section>
    </>
  );
}

export default Home;
