import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import "./App.css";
import Layout from "./components/Layout.js";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import CreatePost from "./pages/Create";
import SinglePost from "./pages/SinglePost";
import EditPage from "./pages/EditPage";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<BlogPage />} />

            {user.username ? (
              <>
                <Route path="create" element={<CreatePost />} />
                <Route path="posts/:slug" element={<SinglePost />} />
                <Route path="edit/:slug" element={<EditPage />} />
              </>
            ) : (
              <>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </>
            )}

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
