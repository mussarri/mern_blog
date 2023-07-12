import Post from "../models/post.js";

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const createPost = async (req, res) => {
  const data = req.body;
  console.log(data);

  const file = req.file?.filename;
  //save db and if success send true or send false
  try {
    const newpost = await Post.create({
      ...data,
      image: file || '',
    });
    res.json(newpost);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
