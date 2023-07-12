import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true, minlength: 4, unique: true },
  summary: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Post = model("Post", PostSchema);

export default Post;
