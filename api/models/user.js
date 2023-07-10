import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, minlength: 4, unique: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", UserSchema);

export default User;
