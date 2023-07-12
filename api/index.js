import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import Post from "./models/post.js";
import {
  loginController,
  refreshController,
  registerController,
  logoutController,
} from "./controller/authController.js";

// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./api/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

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

app.post("/create", upload.single("image"), async (req, res) => {
  const data = req.body;

  const file = req.file?.filename;
  //save db and if success send true or send false
  try {
    const newpost = await Post.create({
      data,
      image: file,
    });
    res.json(newpost);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.listen(4000, () => {
  console.log(`app listening on port ${4000}`);
});
