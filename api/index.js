import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { loginController, refreshController, registerController, logoutController } from "./controller/authController.js";

const secretAccess =
  "1CA8503EB02B6B1D3B974CBB79E513D8A75C1A0F4F7AB3605C705A83D0CFDE09";

const secretRefresh =
  "eyJhbGciOiJIUzI1NiJ9IekTJ3jdWOSXqA6LyXbT_xhXM8O_U7vsMTZ7k9J9l4I";


const app = express();

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("open", () => console.log("Connected to db"));

const corsOptions = {
  origin: "http://localhost:3000", // Adjust the origin to match your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.post("/register", registerController);

app.post("/login", loginController);

app.get("/refresh", refreshController);

app.get("/logout", logoutController);

app.listen(4000, () => {
  console.log(`app listening on port ${4000}`);
});
