
// 📁 models/PostModel.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, collection: "posts" }
);

module.exports = mongoose.model("Post", postSchema);
