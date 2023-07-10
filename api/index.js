import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js";

const app = express();

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("open", () => console.log("Connected to db"));

app.use(express.json());

app.use(cors());

app.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const newUser = await User.create(data);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const isUser = await User.findOne({ username });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
});
