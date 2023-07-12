import React, { useContext, useState } from "react";
import Blog from "../components/Blog";
import { UserContext } from "../App";
import { useEffect } from "react";
import { instance } from "../components/Layout";

function Home() {
  const { user } = useContext(UserContext);
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
      <h4>{user.username && user.username}</h4>
      <section className="posts">
        <h3 className="m-1">Last Blogs</h3>
        {posts.length < 0 ? "No post" : posts.map((post, i) => <Blog post={post} />)}
      </section>
    </>
  );
}

export default Home;
