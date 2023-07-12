import mongoose from "mongoose";
const { Schema, model } = mongoose;
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const PostSchema = new Schema({
  title: { type: String, required: true, minlength: 4, unique: true },
  slug: { type: String, slug: "title", unique: true },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("Post", PostSchema);

export default Post;
