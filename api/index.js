import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "./models/user.js";

const app = express();

const salt = bcrypt.genSaltSync(10);

const secretAccess =
  "1CA8503EB02B6B1D3B974CBB79E513D8A75C1A0F4F7AB3605C705A83D0CFDE09";

const secretRefresh =
  "eyJhbGciOiJIUzI1NiJ9IekTJ3jdWOSXqA6LyXbT_xhXM8O_U7vsMTZ7k9J9l4I";

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("open", () => console.log("Connected to db"));

const corsOptions = {
  origin: "http://localhost:3000", // Adjust the origin to match your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hashed = bcrypt.hashSync(password, salt);
  try {
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashed,
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const isUser = await User.findOne({ username });
  if (isUser) {
    const passMatch = bcrypt.compareSync(password, isUser.password);
    if (passMatch) {
      const accessToken = jwt.sign(
        {
          username: isUser.username,
          email: isUser.email,
        },
        secretAccess,
        {
          expiresIn: "10m",
        }
      );

      const refreshToken = jwt.sign(
        {
          username: isUser.username,
          email: isUser.email,
        },
        secretRefresh,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({ accessToken });
    } else {
      res.status(400).json("Password is not true");
    }
  } else {
    res.status(400).json("User is not found");
  }
});

app.get("/refresh", (req, res) => {
  if (req.cookies?.jwt) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;
    console.log(refreshToken);
    // Verifying refresh token
    jwt.verify(refreshToken, secretRefresh, (err, decoded) => {
      console.log(decoded);
      if (err) {
        // Wrong Refesh Token
        return res.status(406).json({ message: "Unauthorized" });
      } else {
        // Correct token we send a new access token
        const accessToken = jwt.sign(
          {
            username: decoded.username,
            email: decoded.email,
          },
          secretAccess,
          {
            expiresIn: "10m",
          }
        );
        return res.json({ accessToken, decoded });
      }
    });
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
});

app.listen(4000, () => {
  console.log(`app listening on port ${4000}`);
});
