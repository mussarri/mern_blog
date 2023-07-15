import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";
import 'dotenv/config'

console.log(slugify("New Post 1"));

import {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
} from "./controller/postController.js";
import {
  loginController,
  refreshController,
  registerController,
  logoutController,
} from "./controller/authController.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);




// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const app = express();

mongoose.connect(process.env.MONGO_URL, {
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
app.use("/upload", express.static(__dirname + "/upload"));
app.use("/posts", express.static(__dirname + "/upload"));

app.post("/register", registerController);

app.post("/login", loginController);

app.get("/refresh", refreshController);

app.get("/logout", logoutController);

app.post("/create", upload.single("image"), createPost);

app.get("/posts", getAllPost);

app.get("/posts/:slug", getSinglePost);

app.patch("/edit/:slug", updatePost);

app.listen(4000, () => {
  console.log(`app listening on port ${4000}`);
});
