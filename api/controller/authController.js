import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const salt = bcrypt.genSaltSync(10);

const secretAccess = process.env.SECRET_ACTIVE;

const secretRefresh = process.env.SECRET_REFRESH;


export const registerController = async (req, res) => {
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
};

export const loginController = async (req, res) => {
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

      return res.json({ accessToken, isUser });
    } else {
      res.status(400).json("Password is not true");
    }
  } else {
    res.status(400).json("User is not found");
  }
};

export const refreshController = (req, res) => {
  if (req.cookies?.jwt && req.cookies?.jwt != "") {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;
    // Verifying refresh token
    jwt.verify(refreshToken, secretRefresh, (err, decoded) => {
      if (!err) {
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
  }
};

export const logoutController = async (req, res) => {
  res.cookie("jwt", "");
  res.json("ok");
};
